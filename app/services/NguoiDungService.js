function NguoiDungService() {
  this.layDanhSachNguoiDung = function() {
    return axios({
      method: "GET",
      url: "http://5dce9e0c75f9360014c25ffc.mockapi.io/api/NguoiDung"
    });
    //   .then(function(result) {
    //     renderTable(result.data);
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
  };

  this.layMotNguoiDung = function(id) {
    return axios({
      method: "GET",
      url: `http://5dce9e0c75f9360014c25ffc.mockapi.io/api/NguoiDung/${id}`
    });
  };

  this.themNguoiDung = function(nguoiDung) {
    return axios({
      method: "POST",
      url: "http://5dce9e0c75f9360014c25ffc.mockapi.io/api/NguoiDung",
      data: nguoiDung
    });
  };

  this.suaNguoiDung = function(id, nguoiDung) {
    return axios({
      method: "PUT",
      url: `http://5dce9e0c75f9360014c25ffc.mockapi.io/api/NguoiDung/${id}`,
      data: nguoiDung
    });
  };

  this.xoaNguoiDung = function(id) {
    return axios({
      method: "DELETE",
      url: `http://5dce9e0c75f9360014c25ffc.mockapi.io/api/NguoiDung/${id}`
    });
  };
  this.timKiemNguoiDung = function(chuoiTimKiem, layDanhSachNguoiDung) {
    return layDanhSachNguoiDung.filter(function(item) {
      return (
        item.taiKhoan.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1
      );
    });
  };
}

// NguoiDungService.prototype.timKiemNguoiDung = function(chuoiTimKiem) {
//   this.layDanhSachNguoiDung()
//     .then(function(result) {
//       const { data } = result;
//       console.log(data);
//       data.filter((item,index) => item.taiKhoan.toLow)
//     })
//     .catch(console.log);
// };

// function renderTable(mangNguoiDung) {
//   var tbody = document.getElementById("tblDanhSachNguoiDung");
//   var content = "";
//   mangNguoiDung.map(function(item, index) {
//     content += `<tr>
//           <td>${index + 1}</td>
//           <td>${item.taiKhoan}</td>
//           <td>${item.matKhau}</td>
//           <td>${item.hoTen}</td>
//           <td>${item.email}</td>
//           <td>${item.soDT}</td>
//           <td>${item.maLoaiNguoiDung}</td>
//           <td>
//               <button class="btn btn-success" data-toggle="modal" data-target="#myModal">Sửa</button>
//               <button class="btn btn-danger">Xóa</button>
//           </td>
//           </tr>`;
//   });
//   tbody.innerHTML = content;
// }
