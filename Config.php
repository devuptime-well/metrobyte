<?php

$nome    = $_POST["nome"];
$email   = $_POST["email"];
$empresa = $_POST["empresa"];
$telefone = $_POST['telefone'];
$servicos = $_POST['servicos'];
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

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->IsSMTP();

$mail->Host = "mail.solucaosites.com.br";
$mail->SMTPAuth = true;
$mail->Username = 'contato@solucaosites.com.br';
$mail->Password = 'Dd74d98200@';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->From = $email;
$mail->FromName = "Formulario Metrobyte";

$mail->AddAddress('welq2005@gmail.com', '');

$mail->isHTML(true);

$mail->Subject = "Formulario Site";
$mail->Body = "
    Nome: {$nome} <br>
    E-mail: {$email} <br>
    Empresa: {$empresa} <br>
    Telefone: {$telefone} <br>
    Servicos: {$servicosArr[$servicos]} <br>
    Computadores na empresa: {$computadoresArr[$computadores]}
";

$enviado = $mail->Send();

if($enviado) {
    echo "Sucesso";
}else{
    echo "Negado";
}