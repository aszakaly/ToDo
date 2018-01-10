<?php

function sendList($conn) {
    $sql = 'SELECT * FROM todo';
    $result = $conn->query($sql)->fetchAll();
    $json = json_encode($result);
    echo $json;
    
    
    /*foreach ($conn->query($sql) as $row) {
        print $row['text'] . "\t";
        print $row['active'] . "\t";
        print $row['added'] . "\n";
    }*/
}

function deleteItem() {
    echo "Delete an item";
}

function addItem($conn, $params){
    //var_dump($params);
    foreach ($params as $key => $value) {
        //var_dump($value);
        $sql = 'INSERT INTO todo (text, active, added) VALUES (\'' . $value["todoText"] . '\', 1, NOW())';
        $sth = $conn->prepare($sql);
        $sth->execute();
    }
    
    /*echo "Add an item";*/
}

$servername = "127.0.0.1:3306";
$username = "root";
$password = "root";

try {
    $conn = new PDO("mysql:host=$servername;dbname=todo", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   
    switch($_GET["action"]) {
        case "list":sendList($conn); break;
        case "delete":deleteItem(); break;
        case "add":addItem($conn, $_POST['params']); break;
        default:echo "Invalid request";
        }
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }

?>