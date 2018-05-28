<?php

    $name = $_POST['user-name'];
    // $email = $_POST['user-email'];
    $tel = $_POST['user-tel'];
    $street = $_POST['user-street'];
    $house = $_POST['user-house'];
    $block = $_POST['user-block'];
    $flat = $_POST['user-flat'];
    $floor = $_POST['user-floor'];
    $payment = $_POST['payment'];
    $comment = $_POST['comment'];

    $disturb = $_POST['call']; // 1 или null
    $disturb = isset($disturb) ? 'НЕТ' : 'ДА';

    $mail_message = '
    <html>
    <head>
        <title>Заявка</title>
    </head>
    <body>
        <h2>Заказ</h2>
        <ul>
            <li>Имя:' . $name . '</li>
            <li>Tel: ' . $tel . '</li>
            <li>Улица: ' . $street . '</li>
            <li>Дом: ' . $house . '</li>
            <li>Корпус: ' . $block . '</li>
            <li>Квартира: ' . $flat . '</li>
            <li>Этаж: ' . $floor . '</li>
            <li>Способ оплаты: ' . $payment . '</li>
            <li>Комментарий к заказу: ' . $comment . '</li>
            <li>Нужно ли перезванивать клиенту: ' . $disturb . '</li>
        </ul>
    </body>
    </html>';

    $headers = "From: ILIA <ilia90i@mail.ru>\r\n".
                "MIME-Version: 1.0" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail('self90@mail.ru', 'Заказ', $mail_message, $headers);

    $data = [];

    if ($mail) {
        $data['status'] = "OK";
        $data['mes'] = "Письмо успешно отправлено";
    }else{
        $data['status'] = "NO";
        $data['mes'] = "На сервере произошла ошибка";
    }

    echo json_encode($data);

?>