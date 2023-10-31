document.addEventListener("DOMContentLoaded", function () {
    let so1Input = document.getElementById('so1');
    let so2Input = document.getElementById('so2');
    let phepTinhLabel = document.getElementById('PhepTinh');
    let kqLabel = document.getElementById('kq');
    let randomButton = document.getElementById('randomButton');
    let resultButton = document.getElementById('resultButton');
    let operationButtons = document.querySelectorAll('.operationButton');
    let historyTable = document.getElementById('historyTable');

    let so1, so2, selectedOperation;

    randomButton.addEventListener('click', function () {
        so1 = Math.floor(Math.random() * 900) + 100; // Số có 3 chữ số
        so2 = Math.floor(Math.random() * 900) + 100; // Số có 3 chữ số
        if (so1 < so2) {
            [so1, so2] = [so2, so1]; // Đảm bảo so1 luôn lớn hơn so2
        }
        so1Input.value = so1;
        so2Input.value = so2;

        // Lưu dữ liệu vào localStorage
        localStorage.setItem('so1', so1);
        localStorage.setItem('so2', so2);
    });

    operationButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            selectedOperation = button.getAttribute('data-operation');
            phepTinhLabel.textContent = selectedOperation;

            // Lưu phép tính vào localStorage
            localStorage.setItem('selectedOperation', selectedOperation);
        });
    });

    resultButton.addEventListener('click', function () {
        so1 = parseFloat(so1Input.value);
        so2 = parseFloat(so2Input.value);

        if (isNaN(so1) || isNaN(so2) || !selectedOperation) {
            alert('Vui lòng nhập đủ thông tin và chọn phép tính.');
            return;
        }

        let result;
        switch (selectedOperation) {
            case '+':
                result = so1 + so2;
                break;
            case '-':
                result = so1 - so2;
                break;
            case '*':
                result = so1 * so2;
                break;
            case '/':
                if (so2 !== 0) {
                    result = so1 / so2;
                } else {
                    result = 'Không thể chia cho 0';
                }
                break;
            default:
                result = 'Phép tính không hợp lệ';
        }

        kqLabel.textContent = result;

        // Lưu kết quả vào localStorage
        localStorage.setItem('result', result);

        // Hiển thị dữ liệu lưu trữ trong bảng
        displayHistory();
    });

    function displayHistory() {
        let newRow = historyTable.insertRow(-1);
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);

        cell1.innerHTML = so1;
        cell2.innerHTML = selectedOperation;
        cell3.innerHTML = so2;
        cell4.innerHTML = kqLabel.textContent;
    }
});
