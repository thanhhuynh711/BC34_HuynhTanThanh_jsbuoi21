var dsnv = new DanhSachNhanVien();

getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNV() {
  var taiKhoan = getEle("tknv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luong = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

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
  var nhanVien = layThongTinNV();
  //thêm nhân viên
  dsnv.themNV(nhanVien);

  setLocalStorage();

  renderTable(dsnv.arr);
});

function renderTable(data) {
  var content = "";
  data.forEach(function (nv) {
    content += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.tenNV}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
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
  var nhanVien = layThongTinNV();
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
