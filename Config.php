<?php

$nome         = $_POST["nome"];
$email        = $_POST["email"];
$empresa      = $_POST["empresa"];
$telefone     = $_POST['telefone'];
$servicos     = $_POST['servicos'];
$computadores = $_POST['computadores'];

$servicosArr = [
    "1" => "Service desk",
    "2" => "Solução em infraestrutura",
    "3" => "Gestão de TI",
    "4" => "Licenciamento / Software",
    "5" => "Compra de equipamentos",
    "6" => "Capacitação / Treinamento",
];
$computadoresArr = [
    "1" => "De 1 a 10 computadores",
    "2" => "De 11 a 20 computadore",
    "3" => "De 21 a 50 computadores",
    "4" => "Mais de 50 computadores"
];

require( __DIR__ . "/PHPMailer/src/PHPMailer.php");
require( __DIR__ . "/PHPMailer/src/SMTP.php");
require( __DIR__ . "/PHPMailer/src/Exception.php");

$mail      = new PHPMailer\PHPMailer\PHPMailer();
$exception = new PHPMailer\PHPMailer\Exception();

try {
    $mail->IsSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = 'metrobyte.landingpage@gmail.com';
    $mail->Password = '78nejbMZl';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->From = $email;
    $mail->FromName = "Formulario Metrobyte";

    $mail->AddAddress('metrobyte.landingpage@gmail.com', '');

    $mail->isHTML(true);

    $mail->Subject = "Formulario Site";
    $mail->Body = "
        Nome:     {$nome} <br>
        E-mail:   {$email} <br>
        Empresa:  {$empresa} <br>
        Telefone: {$telefone} <br>
        Servicos: {$servicosArr[$servicos]} <br>
        Computadores na empresa: {$computadoresArr[$computadores]}
    ";

    $enviado = $mail->Send();
    echo '{"Error": 0}';

} catch (Exception $e) {
    echo '{"Error": 500}';
}