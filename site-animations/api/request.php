<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond(int $code, array $data): void { http_response_code($code); echo json_encode($data, JSON_UNESCAPED_UNICODE); exit; }
if (($_SERVER['HTTPS'] ?? '') !== 'on') respond(400, ['message'=>'Connexion HTTPS requise.']);
session_name('calbar_form');
session_set_cookie_params(['lifetime'=>0,'path'=>'/','secure'=>true,'httponly'=>true,'samesite'=>'Strict']);
session_start();
if (!isset($_SESSION['csrf'])) { $_SESSION['csrf']=bin2hex(random_bytes(32)); $_SESSION['issued']=time(); }
$method=$_SERVER['REQUEST_METHOD'] ?? '';
if ($method==='GET') respond(200, ['csrf'=>$_SESSION['csrf']]);
if ($method!=='POST') { header('Allow: GET, POST'); respond(405,['message'=>'Méthode non autorisée.']); }
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0)>16000) respond(413,['message'=>'Demande trop volumineuse.']);
if (!is_string($_POST['csrf'] ?? null) || !hash_equals($_SESSION['csrf'],$_POST['csrf'])) respond(403,['message'=>'Rechargez la page avant de réessayer.']);
if (time()-(int)$_SESSION['issued']<3 || !empty($_POST['website'])) respond(400,['message'=>'Veuillez patienter puis réessayer.']);
function field(string $key, int $max, bool $required=false): string {
 $v=$_POST[$key] ?? ''; if (!is_string($v) || strlen($v)>$max || ($required && trim($v)==='')) respond(422,['message'=>'Veuillez vérifier les champs du formulaire.']);
 return trim($v);
}
$name=field('name',100,true); $email=field('email',200,true); $phone=field('phone',30); $message=field('message',3000); $type=field('request_type',20,true); $date=field('date',10,true); $slot=field('slot',10);
if (preg_match('/[\r\n\x00]/',$name.$email.$phone) || !filter_var($email,FILTER_VALIDATE_EMAIL)) respond(422,['message'=>'Vérifiez votre nom et votre email.']);
$types=['table'=>'Réservation au bar','atelier'=>'Atelier cocktails / EVJF','evenement'=>'Événement / privatisation'];
if (!isset($types[$type])) respond(422,['message'=>'Type de demande invalide.']);
$guests=filter_var($_POST['guests'] ?? null,FILTER_VALIDATE_INT);
if ($guests===false || $guests<($type==='atelier'?4:1) || $guests>($type==='atelier'?10:200)) respond(422,['message'=>'Vérifiez le nombre de personnes (4 à 10 pour un atelier).']);
$tz=new DateTimeZone('Europe/Paris');$d=DateTimeImmutable::createFromFormat('!Y-m-d',$date,$tz);
if (!$d || $d->format('Y-m-d')!==$date || $d<new DateTimeImmutable('today',$tz) || in_array((int)$d->format('N'),[1,7],true)) respond(422,['message'=>'Choisissez une date à venir, du mardi au samedi.']);
if ($type==='atelier' && !in_array($slot,['15-16','16-17','17-18'],true)) respond(422,['message'=>'Choisissez un créneau valide.']);
// Fixed-window rate limit, shared across sessions; only a hashed address is retained.
$dir=sys_get_temp_dir().'/calbar-form-limits';
if (!is_dir($dir) && !@mkdir($dir,0700,true) && !is_dir($dir)) respond(503,['message'=>'Service momentanément indisponible.']);
$path=$dir.'/'.hash('sha256',($_SERVER['REMOTE_ADDR'] ?? '').'|calbar-form').'.json';
$fp=@fopen($path,'c+');if (!$fp || !flock($fp,LOCK_EX)) respond(503,['message'=>'Service momentanément indisponible.']);
$record=json_decode(stream_get_contents($fp)?:'{}',true)?:[];$now=time();$times=array_values(array_filter($record,fn($n)=>is_int($n)&&$n>$now-3600));
if (count($times)>=5) {flock($fp,LOCK_UN);fclose($fp);respond(429,['message'=>'Trop de demandes. Réessayez plus tard ou téléphonez-nous.']);}
$times[]=$now;ftruncate($fp,0);rewind($fp);fwrite($fp,json_encode($times));flock($fp,LOCK_UN);fclose($fp);
foreach (glob($dir.'/*.json')?:[] as $old) {if (filemtime($old)<$now-86400) @unlink($old);}
// Configuration is kept OUTSIDE public_html. No credentials belong in the website files.
$configPath=dirname(__DIR__,2).'/calbar-form-config.php';
$config=is_file($configPath)?require $configPath:[];
if (!is_array($config) || ($config['enabled']??false)!==true) respond(503,['message'=>'Le formulaire est en cours d’activation. Appelez-nous au 01 84 06 18 90.']);
$to='Thierry@lecalbarcocktail.com';$from='info@lecalbarcocktail.com';
$subject='=?UTF-8?B?'.base64_encode('Le Calbar — '.$types[$type]).'?=';
$body="Nouvelle demande depuis le site Le Calbar\n\nType : {$types[$type]}\nNom : $name\nEmail : $email\nTéléphone : $phone\nPersonnes : $guests\nDate souhaitée : $date\nCréneau atelier : ".($type==='atelier'?$slot:'Non applicable')."\n\nMessage :\n$message\n\nCette demande ne constitue pas une réservation confirmée.\n";
$headers=['From: Le Calbar <'.$from.'>','Reply-To: '.$email,'MIME-Version: 1.0','Content-Type: text/plain; charset=UTF-8'];
if (!mail($to,$subject,$body,implode("\r\n",$headers))) respond(503,['message'=>'L’envoi a échoué. Appelez-nous au 01 84 06 18 90.']);
$_SESSION['csrf']=bin2hex(random_bytes(32));$_SESSION['issued']=time();
respond(200,['ok'=>true]);
