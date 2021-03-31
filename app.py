from flask import Flask, render_template, request, flash
from wtforms import Form, TextAreaField, validators
import os
import json
import base64
import main
import numpy as np
import io
from imageio import imread
import cv2
from PIL import Image, ExifTags

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('inicio.html')


@app.route("/prueba")
def prueba():
    return render_template('prueba.html')


@app.route('/liveness')
def liveness():
    return render_template('liveness.html')


@app.route('/reconocimiento')
def reconocimiento():
    return render_template('index.html')


@app.route('/registrarse')
def registrarse():
    result = {'img_format': ''}
    return render_template('registrarse.html', result=result)


@app.route('/registro')
def registro():
    result = {'img_format': ''}
    return render_template('registrarse_dni.html', result=result)

# @app.route("/ajax-login",methods=['POST'])
# def ajax_login():
#	if request.method == 'POST':
#		#print(request.form)
#		DNI = request.form['dni']
#		nombre = request.form['nombre_p']
#		response = {'status':200,'DNI':DNI,'nombre':nombre}
#		return json.dumps(response)


@app.route("/Image_live", methods=['POST'])
def ajax_live():
    if request.method == 'POST':
        data = request.get_json()
        pimg = imread(io.BytesIO(base64.b64decode(data['image'],)))
        # b = bytes(data['image'], 'utf-8')
        frame = cv2.cvtColor(
            np.array(pimg, dtype='float32'), cv2.COLOR_RGB2BGR)
        imgencode = cv2.imencode('.jpg', frame)[1]
        image_64_encode = base64.b64encode(imgencode).decode('utf-8')

        # image_2 = base64.decodebytes(b)
        # image_64_encode = base64.b64encode(image_2).decode('ascii')
        condition = data['condition']
        params = {'imagenes': image_64_encode, 'condition': condition}
        json_salida = json.dumps(params)
        response1 = main.AWS_LIVENESS(json_salida)
        salida = response1['Salida']
        if salida == True:
            response = main.AWS(image_64_encode)
            print(response)
            image_dni_in = response['Image_dni']

            DNI = response['DNI']
            if DNI == '':
                DNI = 0

            DNI = int(DNI)

            # df_usuario=pd.read_csv('data.csv')
            if DNI > 0:
                Usuario_DNI = response['DNI']
                Usuario_Nombre = response['Nombre']
                Usuario_Apellido = response['Apellido']
                Accuracy = response['Accuracy']
                image_dni = image_dni_in
                result = {
                    'DNI': Usuario_DNI,
                    'Nombre': Usuario_Nombre,
                    'Apellido': Usuario_Apellido,
                    'Accuracy': Accuracy,
                    'image_path': image_64_encode,
                    'image_path_dni': image_dni}
                return render_template('results.html', result=result)
            else:
                Usuario_DNI = 'No identificado'
                Usuario_Nombre = 'No identificado'
                Usuario_Apellido = 'No identificado'
                Accuracy = 'No identificado'
                # image_dni='static/img_dni/no_existe.jpg'
                image_dni = image_dni_in
                result = {
                    'DNI': Usuario_DNI,
                    'Nombre': Usuario_Nombre,
                    'Apellido': Usuario_Apellido,
                    'Accuracy': Accuracy,
                    'image_path': image_64_encode,
                    'image_path_dni': image_dni}
                return render_template('results_2.html', result=result)

        else:
            result = {
                'DNI': 'No hizo caso a las indicaciones',
                'image_path': image_64_encode}
            return render_template('results_liveness.html', result=result)

        # image_2 = base64.decodebytes(image)
        # image_64_encode = base64.b64encode(image_2).decode('ascii')
        # print(type(image_64_encode))
        # response=main.AWS(image_64_encode)

        # image_dni_in = response['Image_dni']

        # DNI=response['DNI']
        # if DNI =='':
        #	DNI=0

        # DNI = int(DNI)

        # df_usuario=pd.read_csv('data.csv')
        # if DNI>0:
        #	return render_template('results.html',result=result)
        # else:
        #	return render_template('results_2.html',result=result)


@app.route("/Image_post", methods=['POST'])
def ajax_login():
    if request.method == 'POST':
        image = request.data

        image_2 = base64.decodebytes(image)
        image_64_encode = base64.b64encode(image_2).decode('ascii')
        response = main.AWS(image_64_encode)

        image_dni_in = response['Image_dni']

        DNI = response['DNI']
        if DNI == '':
            DNI = 0

        DNI = int(DNI)

        # df_usuario=pd.read_csv('data.csv')
        if DNI > 0:
            Usuario_DNI = response['DNI']
            Usuario_Nombre = response['Nombre']
            Usuario_Apellido = response['Apellido']
            Accuracy = response['Accuracy']
            image_dni = image_dni_in
            result = {
                'DNI': Usuario_DNI,
                'Nombre': Usuario_Nombre,
                'Apellido': Usuario_Apellido,
                'Accuracy': Accuracy,
                'image_path': image_64_encode,
                'image_path_dni': image_dni}
            return render_template('results.html', result=result)
        else:
            Usuario_DNI = 'No identificado'
            Usuario_Nombre = 'No identificado'
            Usuario_Apellido = 'No identificado'
            Accuracy = 'No identificado'
            # image_dni='static/img_dni/no_existe.jpg'
            image_dni = image_dni_in
            result = {
                'DNI': Usuario_DNI,
                'Nombre': Usuario_Nombre,
                'Apellido': Usuario_Apellido,
                'Accuracy': Accuracy,
                'image_path': image_64_encode,
                'image_path_dni': image_dni}
            return render_template('results_2.html', result=result)


@app.route("/upload", methods=['GET', 'POST'])
def uploader():
    if request.method == 'POST':
        # obtenemos el archivo del input "archivo"
        t = request.files['archivo']
        f = t.filename
        image_path = os.path.join('static/imagenes', f)
        t.save(image_path)

        img = Image.open(image_path)
        img_exif = img.getexif()
        print(img_exif.items())


        # open binary file in read mod
        image = open(image_path, 'rb')
        image_read = image.read()
        image_64_encode = base64.b64encode(image_read).decode('ascii')

        dni = request.form['dni']
        nombre_p = request.form['nombre_p']
        nombre_s = request.form['nombre_s']
        apellido_p = request.form['apellido_p']
        apellido_m = request.form['apellido_m']

        params = {'body': image_64_encode, 'dni': dni, 'nombre_p': nombre_p,'nombre_s': nombre_s, 'apellido_p': apellido_p, 'apellido_m': apellido_m}

        json_salida = json.dumps(params)

        response = main.AWS_CARGA(json_salida)
        print(response)

        Face = response['Face']

        if Face == 'No registrado':
            result = {
                    'class': response,
                    'Respuesta': 'No Registrado',
                    'image_path': image_path}
            return render_template('results_new_no.html', result=result)
        else:
            result = {
                    'class': response,
                    'Respuesta': 'Registrado Correctamente',
                    'image_path': image_path}
            return render_template('results_new.html', result=result)


@app.route("/charge_dni", methods=['POST'])
def charge_dni():
    if request.method == 'POST':
        t = request.files['archivo']
        f = t.filename
        image_path = os.path.join('static/imagenes', f)
        t.save(image_path)
        img = Image.open(image_path)
        img_exif = img.getexif()
        
        if img_exif:
            for key, val in img_exif.items():
                while key == 274:
                    print(f'{ExifTags.TAGS[key]}:{val}')
                    print(val)
                    if val == 1:

                        # open binary file in read mod
                        image = open(image_path, 'rb')
                        image_read = image.read()
                        image_64_encode = base64.b64encode(image_read).decode('ascii')
                        
                        dni = request.form['dni']
                        nombre_p = request.form['nombre_p']
                        nombre_s = request.form['nombre_s']
                        apellido_p = request.form['apellido_p']
                        apellido_m = request.form['apellido_m']
                        
                        params = {'body': image_64_encode, 'dni': dni, 'nombre_p': nombre_p,
                                'nombre_s': nombre_s, 'apellido_p': apellido_p, 'apellido_m': apellido_m}

                        json_salida = json.dumps(params)

                        response_text = main.AWS_CARGA_DNI(json_salida)

                        if response_text['salida'] == []:
                            result={
                            'class':response_text,
                            'Respuesta': 'La imagen subida no es correcta',
                            'image_path': image_path }
                            return render_template('results_no_dni.html',result=result)
                        else:
                            if (nombre_p.upper() in response_text['salida']) and (apellido_p.upper() in response_text['salida']) and (apellido_m.upper() in response_text['salida']):
                                response = main.AWS_CARGA(json_salida)
                                Face=response['Face']

                                if Face == 'No registrado':
                                    result={
                                    'class':response,
                                    'Respuesta': 'No Registrado',
                                    'image_path':image_path }
                                    return render_template('results_new_no_dni.html',result=result)
                                else:
                                    result={
                                    'class':response,
                                    'Respuesta': 'Registrado Correctamente',
                                    'image_path':image_path }
                                    return render_template('results_new.html',result=result)

                            else:
                                result={
                                'class': 'Problema con datos',
                                'Respuesta': 'Sus datos no coinciden',
                                'image_path': image_path }
                                return render_template('results_no_dni.html',result=result)


                    elif val != 1:
                        result = {
                            'img_format': 'Orientación incorrecta, haga la captura como en la imagen de ejemplo.'}
                        return render_template('registrarse_dni.html', result=result)

            result = {
                'img_format': 'Mil disculpas, la imagen seleccionada no tiene el formato correcto. Capture su imagen con otra cámara.'}
            return render_template('registrarse_dni.html', result=result)

        else:
            result = {
                'img_format': 'Mil disculpas, la imagen seleccionada no tiene el formato correcto (*solo .jpg o .jpeg) o ha sido descargado de alguna red social'}
            return render_template('registrarse_dni.html', result=result)
            
            

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
