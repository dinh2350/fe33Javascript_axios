var nguoiDungService = new NguoiDungService();

getListUser();

getEle("btnThemNguoiDung").addEventListener("click", function() {
  clearInput();
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm người dùng";

  var footer = `
        <button class="btn btn-success" data-dismiss="modal" onclick="ThemNguoiDung()">Thêm</button>
    `;

  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

/**
 * Them nguoi dung
 */
function ThemNguoiDung() {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var soDT = getEle("SoDienThoai").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;

  var nguoiDung = new NguoiDung(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    soDT,
    loaiNguoiDung
  );

  nguoiDungService
    .themNguoiDung(nguoiDung)
    .then(function(result) {
      console.log(result);
      getListUser();
      alert(`thêm người dùng thành công`);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function xoaNguoiDung(id) {
  nguoiDungService
    .xoaNguoiDung(id)
    .then(function(result) {
      getListUser();
      alert(`đã xóa người dùng có id là ${id}`);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function suaNguoiDung(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Sửa người dùng";
  var footer = `
        <button class="btn btn-success" data-dismiss="modal" onclick="capNhatNguoiDung(${id})">Cập Nhật</button>
    `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  nguoiDungService
    .layMotNguoiDung(id)
    .then(function(result) {
      const {
        taiKhoan,
        hoTen,
        matKhau,
        email,
        soDT,
        maLoaiNguoiDung
      } = result.data;

      getEle("TaiKhoan").value = taiKhoan;
      getEle("HoTen").value = hoTen;
      getEle("MatKhau").value = matKhau;
      getEle("Email").value = email;
      getEle("SoDienThoai").value = soDT;
      getEle("loaiNguoiDung").value = maLoaiNguoiDung;
    })
    .catch(function(err) {
      console.log(err);
    });
}

function capNhatNguoiDung(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var soDT = getEle("SoDienThoai").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;

  var nguoiDung = new NguoiDung(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    soDT,
    loaiNguoiDung
  );

  nguoiDungService
    .suaNguoiDung(id, nguoiDung)
    .then(function(result) {
      getListUser();
    })
    .catch(console.log);
}

function getListUser() {
  nguoiDungService
    .layDanhSachNguoiDung()
    .then(function(result) {
      renderTable(result.data);
      setLocalStorage(result.data);
    })
    .catch(function(errors) {
      console.log(errors);
    });
}

getEle("search").addEventListener("keyup", timKiemNguoiDung);
function timKiemNguoiDung() {
  const chuoiTimKiem = getEle("search").value;
  let mangNguoiDung = getLocalStorage();
  mangNguoiDung = nguoiDungService.timKiemNguoiDung(
    chuoiTimKiem,
    mangNguoiDung
  );
  console.log(mangNguoiDung), renderTable(mangNguoiDung);
}

function getLocalStorage() {
  if (localStorage.getItem("DSNV"))
    return JSON.parse(localStorage.getItem("DSNV"));
  else return "lổi getLocalStorage";
}

function setLocalStorage(danhSachNguoiDung) {
  localStorage.setItem("DSNV", JSON.stringify(danhSachNguoiDung));
}

function clearInput() {
  getEle("TaiKhoan").value = null;
  getEle("HoTen").value = null;
  getEle("MatKhau").value = null;
  getEle("Email").value = null;
  getEle("SoDienThoai").value = null;
  getEle("loaiNguoiDung").value = null;
}

function renderTable(mangNguoiDung) {
  var contentHTML = "";

  mangNguoiDung.map(function(item, index) {
    contentHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.taiKhoan}</td>
                    <td>${item.matKhau}</td>
                    <td>${item.hoTen}</td>
                    <td>${item.email}</td>
                    <td>${item.soDT}</td>
                    <td>${item.maLoaiNguoiDung}</td>
                    <td>
                      <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNguoiDung(${
                        item.id
                      })">Sửa</button>
                      <button class="btn btn-danger" onclick="xoaNguoiDung(${
                        item.id
                      })">Xóa</button>
                    </td>
                </tr>
            `;
  });
  document.getElementById("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

function getEle(id) {
  return document.getElementById(id);
}
