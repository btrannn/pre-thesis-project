import csv
import json
import numpy as np
from scipy.signal import welch, butter, lfilter
import os # Import thư viện os để xử lý đường dẫn

# --- CẤU HÌNH ---
# SỬA LỖI ĐƯỜNG DẪN: File nằm trong thư mục 'datasets'
INPUT_FILE = os.path.join('datasets', 'emotiv_data_raw.csv')
OUTPUT_FILE = 'focus_scores.json'
SAMPLING_RATE = 128
WINDOW_SIZE = 128 * 2
STEP_SIZE = 128 // 2

# Index của các cột AF3 và AF4 trong file CSV (Bắt đầu từ 0)
AF3_INDEX = 3
AF4_INDEX = 16

# --- KHAI BÁO DẢI TẦN SỐ ---
BANDS = {
    'Alpha': (8, 12),
    'Beta': (13, 30),
}

# --- 1. HÀM TÍNH TOÁN BAND POWER SỬ DỤNG FFT (WELCH'S METHOD) ---
def get_band_power(signal, band, fs):
    """Tính toán công suất trung bình của một dải tần số nhất định."""
    
    # 1. Tính toán Phổ công suất (Power Spectral Density - PSD)
    freqs, psd = welch(
        signal, 
        fs=fs, 
        nperseg=WINDOW_SIZE, 
        average='mean', 
        detrend=False
    )
    
    # 2. Tìm index của dải tần số mong muốn
    idx_band = np.logical_and(freqs >= band[0], freqs <= band[1])
    
    # 3. Tính toán Công suất trung bình trong dải tần số đó (Band Power)
    band_power = np.sum(psd[idx_band])
    return band_power

# --- 2. HÀM XỬ LÝ CHÍNH ---
def process_eeg_data(input_file, output_file, fs):
    # Đọc dữ liệu thô
    raw_data = []
    
    # KIỂM TRA XEM FILE CÓ TỒN TẠI KHÔNG
    if not os.path.exists(input_file):
        print(f"LỖI FATAL: Không tìm thấy file dữ liệu đầu vào tại đường dẫn: {input_file}")
        return

    with open(input_file, 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            # Chuyển đổi các cột EEG sang float (từ index 3 đến index 16)
            try:
                # Kiểm tra độ dài hàng trước khi truy cập
                if len(row) > 16:
                    eeg_values = [float(row[i]) for i in range(3, 17)]
                    raw_data.append(eeg_values)
            except ValueError:
                # Bỏ qua hàng tiêu đề hoặc hàng bị lỗi
                continue

    if not raw_data:
        print("Lỗi: Không tìm thấy dữ liệu EEG hợp lệ sau khi đọc.")
        return

    raw_data = np.array(raw_data)
    
    # Trích xuất riêng AF3 và AF4
    af3_raw = raw_data[:, AF3_INDEX - 3] 
    af4_raw = raw_data[:, AF4_INDEX - 3] 

    # --- 3. TIỀN XỬ LÝ (PRE-PROCESSING) ---
    DC_OFFSET = 4200 
    af3_filtered = af3_raw - DC_OFFSET
    af4_filtered = af4_raw - DC_OFFSET
    
    # --- 4. TÍNH TOÁN FOCUS INDEX THEO CỬA SỔ TRƯỢT ---
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
            
        min_focus = 0.5  
        max_focus = 3.0
        
        normalized_score = np.clip(
            (focus_index - min_focus) / (max_focus - min_focus), 
            0, 
            1
        )
        
        focus_scores.append(float(normalized_score))

    # --- 5. LƯU KẾT QUẢ VÀO FILE JSON ---
    with open(output_file, 'w') as f:
        json.dump(focus_scores, f)

    print(f"Hoàn tất xử lý. Đã lưu {len(focus_scores)} điểm Focus vào file: {output_file}")
    print("Các điểm số này đại diện cho Mức độ Tập trung theo từng khoảng thời gian 0.5s.")

# --- 6. CHẠY CHƯƠNG TRÌNH ---
# BỎ COMMENT DÒNG NÀY ĐỂ ĐẢM BẢO HÀM ĐƯỢC GỌI
process_eeg_data(INPUT_FILE, OUTPUT_FILE, SAMPLING_RATE)