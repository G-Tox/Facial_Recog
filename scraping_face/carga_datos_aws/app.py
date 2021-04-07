import os
import json
import base64
import main
import io
import cv2
import pandas as pd

data = pd.read_csv('../lista1.csv')

for m in range(data.shape[0]):
    image_path=os.path.join('../imagenes_nuevas',data.iloc[m][3]+'.png')
    dni=str(data.iloc[m][6])
    nombre_p=data.iloc[m][4]
    nombre_s=data.iloc[m][5]
    apellido_p=data.iloc[m][2]
    apellido_m=data.iloc[m][1]
    image = open(image_path, 'rb')
    image_read = image.read()
    image_64_encode = base64.b64encode(image_read).decode('ascii')
    print(image_path,nombre_p,apellido_p,dni)
    params={'body': image_64_encode , 'dni': dni , 'nombre_p':nombre_p , 'nombre_s':nombre_s , 'apellido_p':apellido_p , 'apellido_m':apellido_m}
    json_salida = json.dumps(params)
    response=main.AWS_CARGA(json_salida)
    print(response)
      











