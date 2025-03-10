// package com.example.caosonlam;

// public class Buoi3 {

// }

//////////////// trigger trong SQL

// 1. Trigger là một chương trình được thực hiện tự động khi một sự kiện xảy ra
// Trigger là một đối tượng được định danh trong CSDL và được gắn chặt với một
// sự kiện xảy ra trên một bảng nào đó (điều này có nghĩa là nó sẽ được tự động
// thực thi khi xảy ra một sự kiện trên một bảng). Các sự kiện này bao gồm:
// INSERT, UPDATE hay DELETE một bảng.

// Tại sao lại sử dụng Trigger?
// 1. Giúp kiểm soát dữ liệu
// 2. Giúp kiểm soát truy cập
// 3. Giúp kiểm soát các hoạt động trên dữ liệu
// 4. Tăng hiệu suất tự động hóa

// Ưu nhược điểm của trigger?
// Ưu điểm:
// 1. Dễ dàng kiểm tra tính toàn vẹn của csdl. – Trigger có thể bắt lỗi logic
// nghiệp vụ (business logic) ở mức csdl.
// 2. Có thể dùng trigger là một cách khác để thay thế việc thực hiện những công
// việc hẹn theo giờ theo lịch.
// 3. Có thể dùng trigger để thực hiện các công việc phức tạp, khó thực hiện
// bằng các câu lệnh SQL thông thường.

// Nhược điểm:
// 1. Trigger chỉ là một phần mở rộng của việc kiểm tra tính hợp lệ của dữ liệu
// chứ không thay thế được hoàn toàn công việc này.
// 2. Trigger hoạt động ngầm ở trong csdl, không hiển thị ở tầng giao diện. Do
// đó, khó chỉ ra được điều gì xảy ra ở tầng csdl.

///////////////// Stored Procedure là gì?

// Stored Procedure là một tập hợp các câu lệnh SQL được lưu trữ trong cơ sở dữ
// liệu và có thể được gọi để thực thi nhiều lần.

// ưu và nhược điểm của Stored Procedure?
// Ưu điểm: Hiệu suất tốt,Năng suất cao hơn,Khả năng mở rộng và bảo trì,Bảo mật
// tốt:
// Nhược điểm:
// 1. Khả năng kiểm tra: logic nghiệp vụ được gói gọn trong các thủ tục lưu trữ
// nên rất khó kiểm tra
// 2. Khả năng gỡ lỗi tôt
// 3. Sợ thay đổi: một trong những nhược điểm lớn nhất của các thủ tục lưu trữ
// là cực kỳ khó để biết phần nào của hệ thống sử dụng chúng và phần nào không.

// Sự khác nhau giữa Trigger và Stored Procedure

// Trigger
// 1. Một Trigger sẽ thực thi tự động mỗi khi có các sự kiện INSERT, DELETE,
// UPDATE xảy ra trong một table.
// 2. Không thể gọi một trigger trong một trigger khác.
// 3. Cú pháp: CREATE TRIGGER TRIGGER_NAME
// 4. Các mệnh đề trong transaction như COMMIT, ROLLBACK, SAVEPOINT đều không
// được sử dụng trong trigger

// Stored Procedure
// 1. Một Procedure sẽ được thi khi khi được gọi thông qua lệnh exec, EXECUTE,
// hay đơn giản procedure_name
// 2. Có thể gọi một procedure trong một procedure khác.
// 3. Cú pháp: CREATE PROCEDURE PROCEDURE_NAME
// 4. Tất cả các mệnh đề trong transaction như COMMIT, ROLLBACK, SAVEPOINT đều
// được sử dụng trong procedure.