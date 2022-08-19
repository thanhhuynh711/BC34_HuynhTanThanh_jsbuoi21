function Validation() {
  this.kiemTraRong = function (value, errorId, mess) {
    //kiểm tra rổng
    if (value === "") {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };

  this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
    if (value.length >= min && value.length <= max) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraKiTuChuoi = function (value, errorId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraEmail = function (value, errorId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraDoDaiPass = function (value, errorId, mess, min, max) {
    if (value.length >= min && value.length <= max) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraPass = function (value, errorId, mess) {
    var letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  //   this.kiemTraNgay = function (value, errorId, mess) {
  //     var letter = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
  //     if (value.match(letter)) {
  //       getEle(errorId).style.display = "none";
  //       getEle(errorId).innerHTML = "";
  //       return true;
  //     }
  //     getEle(errorId).style.display = "block";
  //     getEle(errorId).innerHTML = mess;
  //     return false;
  //   };

  this.kiemTraSoLuong = function (value, errorId, mess, min, max) {
    if (value >= min && value <= max) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraLuong = function (value, errorId, mess) {
    var letter = /^[0-9]+$/;
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraChucVu = function (selectId, errorId, mess) {
    if (getEle(selectId).selectedIndex !== 0) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraSoGioLam = function (value, errorId, mess, min, max) {
    if (value >= min && value <= max) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraMaNVTonTai = function (value, errorId, mess, list) {
    var status = list.some(function (nv) {
      return value === nv.taiKhoan;
    });

    if (status) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };
}
