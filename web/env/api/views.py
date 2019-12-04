import pgeocode
from flask import Blueprint, jsonify, request, flash, render_template,  url_for, redirect,  make_response
from flask_login import current_user, login_user, logout_user, login_required, LoginManager
from . import db
from .models import Empresa, User
from .login import LoginForm, RegistrationForm
from flask_cors import CORS, cross_origin
    
main = Blueprint('main', __name__)

###############################EMPRESAS###################################################################

#Adiciona empresas
@main.route('/empresas', methods=['POST'])
def add_empresas():
    dados_empresa = request.get_json()   
    new_empresa = Empresa(nome=dados_empresa['nome'], telefone=dados_empresa['telefone'], morada=dados_empresa['morada'],codigopostal=dados_empresa['codigopostal'],freguesia=dados_empresa['freguesia'], count = dados_empresa['count'])
    db.session.add(new_empresa)
    db.session.commit()

    return 'Done', 201

#Listagem das empresas
@main.route('/showempresas')
def empresas():
   
    empresas_list = Empresa.query.all()
    empresas = []

    for empresa in empresas_list:
        empresas.append({'id': empresa.id,'nome' : empresa.nome, 'telefone':empresa.telefone, 'morada': empresa.morada, 'codigopostal': empresa.codigopostal, 'freguesia': empresa.freguesia, 'count': empresa.count})
    
    return jsonify ({"empresas": empresas})
   
#Filtragem das empresas pelo nome
@main.route('/showempresas/<string:nome>', methods=['GET'])
def shownome(nome):
    
    request = Empresa.query.filter_by(nome = nome).all() 
    requests = []
  
    #Incrementa o número de pesquisas associado à empresa
    for empresa in request:
        empresa.count = empresa.count + 1
    db.session.commit()   
    
    for requested in request:
        requests.append( {'nome' : requested.nome, 'telefone':requested.telefone, 'morada': requested.morada, 'codigopostal': requested.codigopostal, 'freguesia': requested.freguesia})
    
    return jsonify ({"empresas": requests})

#Filtragem das empresas pelo id
@main.route('/showempresas/<int:id>')
def showid(id):
  
    request = Empresa.query.filter_by(id = id).all()  
    requests = []

    #Incrementa o número de pesquisas associado à empresa
    for empresa in request:
        empresa.count = empresa.count + 1
    db.session.commit()   
    return render_template('main/empresas.html', empresas=request) 



#Filtragem das empresas pelo nome e freguesia 
@main.route('/showempresas/<string:nome>/<string:local>', methods = ['GET'])
@cross_origin()
def shownomefreguesia(nome, local):

    request = Empresa.query.filter_by(nome = nome, freguesia = local).all() 
    requests = []
    
  
    #Incrementa o número de pesquisas associado à empresa
    for empresa in request:
        empresa.count = empresa.count + 1

    db.session.commit()   
        
    for requested in request:
        requests.append( {'nome' : requested.nome, 'telefone':requested.telefone, 'morada': requested.morada, 'codigopostal': requested.codigopostal, 'freguesia': requested.freguesia})
    
    return jsonify ({"empresas": requests})

#Editar empresas por id
@main.route('/editarempresas/<int:id>', methods=['PUT'])
@cross_origin()
def editarempresas(id):

    post_data = request.get_json()
    editnome = post_data.get('nome')
    edittelefone = post_data.get('telefone')
    editmorada = post_data.get('morada')
    editcodigopostal = post_data.get('codigopostal')
    editfreguesia = post_data.get('freguesia')

    empresa = Empresa.query.get(id)
    empresa.nome = editnome
    empresa.telefone = edittelefone
    empresa.morada = editmorada
    empresa.codigopostal = editcodigopostal
    empresa.freguesia = editfreguesia
    
    db.session.commit()
    return 'editado', 201

#Eliminar empresas pelo ID
@main.route('/deleteempresas/<int:id>', methods = ['DELETE'])
@cross_origin()
def deleteempresas(id):

    request = Empresa.query.filter_by(id = id).first()
    db.session.delete(request)
    db.session.commit()       
    
    return 'Deleted'


#Paginacao
@main.route('/index')
def index():

    page = request.args.get('page', 1, type=int)
    empresas = Empresa.query.order_by(Empresa.id.desc()).paginate(page=page, per_page=5)
    
    return render_template('auth/index.html', empresas = empresas)

###########################################Autentificação###############################################################
  
#Login
@main.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        
        if user is None or not user.check_password(form.password.data):
            flash(('Invalid username or password'))
            return redirect(url_for('main.login'))

        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
    
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('main.index')
        return redirect(next_page)
    
    return render_template('auth/login.html', title=('Sign In'), form=form)
  
#Logout
@main.route('/logout')
def logout():

    logout_user()
    return redirect(url_for('main.home'))

#Registo de um novo administrador(user)
@main.route('/register', methods=['POST', 'GET'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('main.login'))
    return render_template('auth/register.html', title='Register',form=form)


#Listagem de administradores
@main.route('/showusers', methods=['GET'])
def showusers():

    users_list = User.query.all()
    users = []

    for user in users_list:
        users.append({'id': user.id,'username' : user.username, 'passwordhash': user.password_hash})
    
    return jsonify({'users' : users})

#########################################################MAPS##########################################################
     
#Com ajuda da biblioteca python pgeocode (obtenção das coordenadas através do código postal fornecido)
#E com o python folium que permite a renderização dessas coordenadas em OpenStreetMap

#Envia um pedido com o nome da empresa e permite obter o código postal da empresa
@main.route("/sendrequest/<string:nome>", methods = ['GET'])
def obt_coordenadas(nome):

    request = Empresa.query.filter_by(nome = nome).all()
    requestcodigopostal = [[empresa.codigopostal] for empresa in request]
    nomi = pgeocode.Nominatim('pt')
    coordenadasobt = nomi.query_postal_code(requestcodigopostal)
    print(coordenadasobt)
   
    return jsonify({'data': requestcodigopostal})

#Renderização do map relacionado com a empresa Vieira Eletricista
@main.route('/mapview')
def mapview():

    return render_template('maps/map.html')
    
#Renderização do map relacionado com a empresa Blip
@main.route('/mapview1')
def mapview1():

    return render_template('maps/map1.html')

    
#Renderização do map relacionado com a empresa Gesfacil  
@main.route('/mapview2')
def mapview2():

    return render_template('maps/map2.html')
   
#Most searched:
@main.route('/mostsearched', methods = ['GET'])
def mostsearched():

    #mais_pesquisados = db.session.query(db.func.max(Empresa.count)).scalar()
    #empresas = db.session.query(Empresa).filter(Empresa.count == mais_pesquisados).all()

    #Lista também as empresas com o mesmo número de 'visualizaações', quando é solicitado a empresa com mais pesquisas,
    #enquanto que a primeira apenas pesquisa a empresa com mais pesquisas

    mais_pesquisados = db.session.query(db.func.max(Empresa.count, 3).label('ml')).subquery()
    empresas = db.session.query(Empresa).join(mais_pesquisados, mais_pesquisados.c.ml == Empresa.count).all()
    requests = []

    print(mais_pesquisados)
    
    for requested in empresas:
        requests.append( {'nome' : requested.nome, 'telefone':requested.telefone, 'morada': requested.morada, 'codigopostal': requested.codigopostal, 'freguesia': requested.freguesia})
    
    return jsonify ({"empresas": requests})
    


  





