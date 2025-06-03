<?php
if (isset($_COOKIE['user'])) {
    echo "ciao cretino, ecco il tuo cookie: " . $_COOKIE['user'];
} else {
    echo "non c'è nessun cookie da rubare";
}
?>