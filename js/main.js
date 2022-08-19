var dsnv = new DanhSachNhanVien();
var validation = new Validation();

getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNV(isAdd) {
  var taiKhoan = getEle("tknv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luong = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  var isValid = true;

  // số tài khoản
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(
        taiKhoan,
        "tbTKNV",
        "(*) vui lòng nhập số tài khoản"
      ) &&
      validation.kiemTraDoDaiKiTu(
        taiKhoan,
        "tbTKNV",
        "(*) vui lòng nhập đủ từ 4-6 số",
        4,
        6
      ) &&
      validation.kiemTraMaNVTonTai(
        taiKhoan,
        "tbTKNV",
        "Tài khoản đã tồn tại",
        dsnv.arr
      );
  }

  // họ tên
  isValid &=
    validation.kiemTraRong(tenNV, "tbTen", "(*) vui lòng nhập họ và tên") &&
    validation.kiemTraKiTuChuoi(
      tenNV,
      "tbTen",
      "(*) vui lòng nhập đúng họ tên"
    );

  // email
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) vui lòng nhập email") &&
    validation.kiemTraEmail(
      email,
      "tbEmail",
      "(*) vui lòng nhập đúng cú pháp email"
    );

  //pass
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) vui lòng nhập mật khẩu"
    ) &&
    validation.kiemTraDoDaiPass(
      matKhau,
      "tbMatKhau",
      "(*) vui lòng nhập mật khẩu từ 6-10 ký tự",
      6,
      10
    ) &&
    validation.kiemTraPass(matKhau, "tbMatKhau", "(*) mật khẩu yếu");

  // // ngày làm
  // isValid &=
  //   validation.kiemTraRong(ngayLam, "tbNgay", "(*) vui lòng nhập ngày làm") &&
  //   validation.kiemTraNgay(ngayLam, "tbNgay", "(*) vui lòng nhập đúng ngày");

  // lương cb
  isValid &=
    validation.kiemTraRong(luong, "tbLuongCB", "(*) vui lòng nhập số lương") &&
    validation.kiemTraLuong(
      luong,
      "tbLuongCB",
      "(*) vui lòng nhập lương là số"
    ) &&
    validation.kiemTraSoLuong(
      luong,
      "tbLuongCB",
      "(*)Lương cơ bản 1 000 000 - 20 000 000",
      1000000,
      20000000
    );

  // chức vụ
  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "(*) vui lòng chọn chức vụ của bạn"
  );

  //giờ làm
  isValid &=
    validation.kiemTraRong(
      gioLam,
      "tbGiolam",
      "(*) vui lòng nhập số giờ làm"
    ) &&
    validation.kiemTraSoGioLam(
      gioLam,
      "tbGiolam",
      "(*)Số giờ làm trong tháng 80 - 200 giờ",
      80,
      200
    );

  if (!isValid) return null;

  //tạo đối tượng nhanVien từ lớp đối tượng NhanVien
  var nhanVien = new NhanVien(
    taiKhoan,
    tenNV,
    email,
    matKhau,
    ngayLam,
    luong,
    chucVu,
    gioLam
  );
  //tính lương
  nhanVien.tinhTongLuong();

  // xếp loại
  nhanVien.xepLoaiNV();

  return nhanVien;
}

// Thêm nhân viên
getEle("btnThemNV").addEventListener("click", function () {
  var nhanVien = layThongTinNV(true);

  if (nhanVien) {
    //thêm nhân viên
    dsnv.themNV(nhanVien);

    setLocalStorage();

    renderTable(dsnv.arr);
  }
});

function renderTable(data) {
  var content = "";
  data.forEach(function (nv) {
    // format vnđ
    var format = new Intl.NumberFormat("vn-VN");
    var tongLuongVND = format.format(nv.tongLuong) + " vnd";

    content += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.tenNV}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${tongLuongVND}</td>
            <td>${nv.xepLoai}</td>
            <td>
            <button id="showInfo" class="btn btn-success" onclick="suaNV('${nv.taiKhoan}')">Sửa</button>
            <button class="mt-2 btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')">Xóa</button>
            </td>
        </tr>
    `;
  });

  getEle("tableDanhSach").innerHTML = content;
}

//Cập nhật nv
getEle("btnCapNhat").addEventListener("click", function () {
  var nhanVien = layThongTinNV(false);
  dsnv._capNhatNV(nhanVien);
  renderTable(dsnv.arr);
  setLocalStorage();
});

//sua nv
function suaNV(taiKhoan) {
  var nv = dsnv._layThongTinNV(taiKhoan);
  if (nv) {
    getEle("tknv").value = nv.taiKhoan;
    getEle("tknv").disabled = true;
    getEle("name").value = nv.tenNV;
    getEle("email").value = nv.email;
    getEle("password").value = nv.matKhau;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luong;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;
  }
}

//Xóa nhân viên
function xoaNV(taiKhoan) {
  dsnv._xoaNV(taiKhoan);
  renderTable(dsnv.arr);
  setLocalStorage();
}

// tìm kiếm nv
getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;

  var mangTimKiem = dsnv._timKienNV(keyword);
  renderTable(mangTimKiem);
});

function setLocalStorage() {
  var dataString = JSON.stringify(dsnv.arr);
  localStorage.setItem("DanhSachNhanVien", dataString);
}

function getLocalStorage() {
  if (localStorage.getItem("DanhSachNhanVien")) {
    var dataString = localStorage.getItem("DanhSachNhanVien");
    var dataJson = JSON.parse(dataString);
    dsnv.arr = dataJson;
    renderTable(dataJson);
  }
}
