# Project
Crawl dữ liệu bài báo cho Project DM & ML

## Yêu cầu
- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/)
- Chưa thay đổi PC name (tên thư mục C:/Users/<tên máy tính> và tên của máy tính trùng nhau). Nếu thông, thay đổi ở biến directoryPath

## Cài đặt

1. Clone repo
```sh
git clone https://github.com/vanhcao3/crawl-dantri.git
cd crawl-dantri
git clone https://github.com/fhamborg/news-please.git
npm install
```
2. Crawl data bằng news-please:
   Tại thư mục chứa project:
```sh
cd news-please/newsplease
python __main__.py
```
3. Ghi dữ liệu vào file csv
   Tại thư mục chứa project:
```sh
node .
```
## Output
Kết quả được lưu trong thư muc Output dưới dạng .csv
