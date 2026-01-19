import pandas as pd
import numpy as np
import json
from scipy.signal import welch

def process_eeg_data(input_file, output_file):
    try:
        df = pd.read_csv(input_file)
    except FileNotFoundError:
        print(f"Lỗi: Không tìm thấy file {input_file}")
        return

    fs = 128 
    theta_band = (4, 8)
    beta_band = (13, 30)

    window_size = int(fs * 1.0)  
    step_size = int(fs * 0.25) 

    focus_scores = []

    channels = ['AF3', 'AF4'] 
    
    available_channels = [ch for ch in channels if ch in df.columns]
    if not available_channels:
        available_channels = df.select_dtypes(include=[np.number]).columns[:2]

    print(f"Đang xử lý các kênh: {available_channels}...")

    for start in range(0, len(df) - window_size, step_size):
        end = start + window_size
        window_data = df.iloc[start:end][available_channels]
        
        epoch_ratios = []

        for channel in available_channels:
            signal = window_data[channel].values
            
            freqs, psd = welch(signal, fs, nperseg=window_size)
            
            theta_idx = np.logical_and(freqs >= theta_band[0], freqs <= theta_band[1])
            theta_power = np.mean(psd[theta_idx]) if np.any(theta_idx) else 1e-10
            
            beta_idx = np.logical_and(freqs >= beta_band[0], freqs <= beta_band[1])
            beta_power = np.mean(psd[beta_idx]) if np.any(beta_idx) else 1e-10
            
            if theta_power > 0:
                ratio = beta_power / theta_power
                epoch_ratios.append(ratio)
        
        if epoch_ratios:
            avg_ratio = np.mean(epoch_ratios)
            focus_scores.append(avg_ratio)

    if focus_scores:
        scores_np = np.array(focus_scores)
        
        scores_np = np.log1p(scores_np)

        lower_bound = np.percentile(scores_np, 5)
        upper_bound = np.percentile(scores_np, 95)
        scores_np = np.clip(scores_np, lower_bound, upper_bound)
        
        min_val = scores_np.min()
        max_val = scores_np.max()
        
        if max_val - min_val > 0:
            normalized_scores = (scores_np - min_val) / (max_val - min_val)
        else:
            normalized_scores = np.zeros_like(scores_np)
            
        window_smooth = 5
        weights = np.exp(np.linspace(-1., 0., window_smooth))
        weights /= weights.sum()
        smooth_scores = np.convolve(normalized_scores, weights, mode='same')
        
        noise = np.random.normal(0, 0.02, len(smooth_scores)) 
        final_scores = smooth_scores + noise
        
        final_scores = np.clip(final_scores, 0.01, 0.99)
        
        final_list = final_scores.tolist()
        
        with open(output_file, 'w') as f:
            json.dump(final_list, f)
    else:
        print("Không đủ dữ liệu để xử lý.")

if __name__ == "__main__":
    raw_data_path = 'emotiv_data_raw.csv' 
    output_json_path = 'focus_scores.json'
    
    process_eeg_data(raw_data_path, output_json_path)