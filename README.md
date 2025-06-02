set FLASK_APP=app.py
flask run --host=0.0.0.0 --port=5000


http.cookie && ip.addr == 192.168.1.X

oppure con filtro GET

http.request.method == "GET" && http.cookie && ip.addr == 192.168.1.X
