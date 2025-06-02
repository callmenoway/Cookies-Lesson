from flask import Flask, request, redirect, render_template, make_response
import secrets

app = Flask(__name__)

# Fake login
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username') #prende lo username dal form
        
        session_token = secrets.token_hex(8)  #generazione di un token casuale per la sessione di 16 caratteri hex
        session_value = f'{username}:{session_token}'

        resp = make_response(redirect('/home'))
        resp.set_cookie('sessionid', session_value)  #cookie personalizzato
        return resp
    return render_template('login.html')

@app.route('/home')
def home():
    sessionid = request.cookies.get('sessionid')
    if sessionid:
        username = sessionid.split(":")[0]
        return render_template('home.html', username=username)
    return redirect('/')
