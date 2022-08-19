function NhanVien(
  _taiKhoan,
  _tenNV,
  _email,
  _matKhau,
  _ngayLam,
  _luong,
  _chucVu,
  _gioLam
) {
  this.taiKhoan = _taiKhoan;
  this.tenNV = _tenNV;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luong = _luong;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;
  this.xepLoai = "";

  this.tinhTongLuong = function () {
    if (this.chucVu === "Sếp") {
      this.tongLuong = parseFloat(this.luong) * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = parseFloat(this.luong) * 2;
    } else if (this.chucVu === "Nhân viên") {
      this.tongLuong = parseFloat(this.luong);
    }
  };

  this.xepLoaiNV = function () {
    if (this.gioLam >= 192) {
      this.xepLoai = "Xuất sắc";
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
      this.xepLoai = "Giỏi";
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
      this.xepLoai = "khá";
    } else {
      this.xepLoai = "Trung bình";
    }
  };
}
