<?php

function connect() {
     $servername = "localhost"; 
     $username = "admin";
     $password = "admin";
     $database = "wowvendor";
     $mysqli = mysqli_connect($servername, $username, $password, $database);
     if (mysqli_connect_errno())
         die( "Connect Error!" );
     return $mysqli;
 }
 
 function sql_query($query) {
     $mysqli = connect();
     $result = mysqli_query($mysqli, $query);
     mysqli_close( $mysqli );
     return $result;
 }

$rock_position = $_POST["rockPosition"];
$rock_size = $_POST["rockSize"];
$jump_distance = $_POST["jumpPosition"];
$race_time = $_POST["raceTime"];
$race_result = $_POST["raceResult"];

sql_query("INSERT INTO wowvendor.results (rock_position, rock_size, jump_distance, race_time, race_result) VALUES ($rock_position, $rock_size, $jump_distance, '$race_time', '$race_result');"
);

?>