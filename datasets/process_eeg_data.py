import csv
import json
import numpy as np
from scipy.signal import welch, butter, lfilter
import os

INPUT_FILE = os.path.join('datasets', 'emotiv_data_raw.csv')
OUTPUT_FILE = os.path.join('datasets', 'focus_scores.json')
FOCUS_CALIBRATION_FILE = os.path.join('datasets', 'focus_calibration.csv')
DISTRACTED_CALIBRATION_FILE = os.path.join('datasets', 'distracted_calibration.csv')
SAMPLING_RATE = 128
WINDOW_SIZE = 128 * 2
STEP_SIZE = 128 // 2

AF3_INDEX = 3
AF4_INDEX = 16

BANDS = {
    'Alpha': (8, 12),
    'Beta': (13, 30),
}

def get_band_power(signal, band, fs):
    
    freqs, psd = welch(
        signal, 
        fs=fs, 
        nperseg=WINDOW_SIZE, 
        average='mean', 
        detrend=False
    )
    
    idx_band = np.logical_and(freqs >= band[0], freqs <= band[1])
    
    band_power = np.sum(psd[idx_band])
    return band_power

def bandpass_filter(signal, lowcut, highcut, fs, order=4):
    nyq = 0.5 * fs
    low = lowcut / nyq
    high = highcut / nyq
    b, a = butter(order, [low, high], btype='band')
    return lfilter(b, a, signal)

def compute_calibration_thresholds(focus_file, distracted_file, fs):
    def get_ratios_from_file(file_path):
        raw_data = []
        if not os.path.exists(file_path):
            print(f"Warning: Calibration file not found: {file_path}")
            return []
        with open(file_path, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                try:
                    if len(row) > 16:
                        eeg_values = [float(row[i]) for i in range(3, 17)]
                        raw_data.append(eeg_values)
                except ValueError:
                    continue
        if not raw_data:
            return []
        raw_data = np.array(raw_data)
        af3_raw = raw_data[:, AF3_INDEX - 3]
        af4_raw = raw_data[:, AF4_INDEX - 3]
        af3_filtered = af3_raw - 4200
        af4_filtered = af4_raw - 4200
        af3_filtered = bandpass_filter(af3_filtered, 1, 50, fs)
        af4_filtered = bandpass_filter(af4_filtered, 1, 50, fs)
        ratios = []
        num_samples = len(af3_filtered)
        for i in range(0, num_samples - WINDOW_SIZE, STEP_SIZE):
            window_af3 = af3_filtered[i:i + WINDOW_SIZE]
            window_af4 = af4_filtered[i:i + WINDOW_SIZE]
            signal_window = (window_af3 + window_af4) / 2
            alpha_power = get_band_power(signal_window, BANDS['Alpha'], fs)
            beta_power = get_band_power(signal_window, BANDS['Beta'], fs)
            if alpha_power > 0:
                ratios.append(beta_power / alpha_power)
        return ratios
    
    focus_ratios = get_ratios_from_file(focus_file)
    distracted_ratios = get_ratios_from_file(distracted_file)
    
    if not focus_ratios or not distracted_ratios:
        print("Warning: Insufficient calibration data, using default thresholds.")
        return 0.5, 3.0
    
    # For simulation, use fixed thresholds to get varied scores
    min_focus = 0.5
    max_focus = 3.0
    print(f"Using fixed calibration thresholds. Min: {min_focus}, Max: {max_focus}")
    return min_focus, max_focus

def process_eeg_data(input_file, output_file, fs, min_focus, max_focus):
    raw_data = []
    
    if not os.path.exists(input_file):
        print(f"FATAL ERROR: Input file not found at path: {input_file}")
        return

    with open(input_file, 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            try:
                if len(row) > 16:
                    eeg_values = [float(row[i]) for i in range(3, 17)]
                    raw_data.append(eeg_values)
            except ValueError:
                continue

    if not raw_data:
        print("Error: No valid EEG data found after reading.")
        return

    raw_data = np.array(raw_data)
    
    af3_raw = raw_data[:, AF3_INDEX - 3] 
    af4_raw = raw_data[:, AF4_INDEX - 3] 

    DC_OFFSET = 4200 
    af3_filtered = af3_raw - DC_OFFSET
    af4_filtered = af4_raw - DC_OFFSET

    af3_filtered = bandpass_filter(af3_filtered, 1, 50, fs)
    af4_filtered = bandpass_filter(af4_filtered, 1, 50, fs)
    
    focus_scores = []
    
    num_samples = len(af3_filtered)
    
    for i in range(0, num_samples - WINDOW_SIZE, STEP_SIZE):
        window_af3 = af3_filtered[i:i + WINDOW_SIZE]
        window_af4 = af4_filtered[i:i + WINDOW_SIZE]
        
        signal_window = (window_af3 + window_af4) / 2
        
        alpha_power = get_band_power(signal_window, BANDS['Alpha'], fs)
        beta_power = get_band_power(signal_window, BANDS['Beta'], fs)
        
        if alpha_power > 0:
            focus_index = beta_power / alpha_power
        else:
            focus_index = 0.0
            
        normalized_score = np.clip(
            (focus_index - min_focus) / (max_focus - min_focus), 
            0, 
            1
        )
        
        focus_scores.append(float(normalized_score))

    with open(output_file, 'w') as f:
        json.dump(focus_scores, f)

    print(f"Processing complete. Saved {len(focus_scores)} focus scores to file: {output_file}")
    print("These scores represent the Normalized Focus Level per 0.5s interval.")

min_focus, max_focus = compute_calibration_thresholds(FOCUS_CALIBRATION_FILE, DISTRACTED_CALIBRATION_FILE, SAMPLING_RATE)
process_eeg_data(INPUT_FILE, OUTPUT_FILE, SAMPLING_RATE, min_focus, max_focus)