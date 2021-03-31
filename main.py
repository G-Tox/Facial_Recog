import requests

def AWS(params):

	#URL='https://kbdjw11h0d.execute-api.us-east-2.amazonaws.com/TEST1/prueba' ----- LISTA
	
	#URL='https://kbdjw11h0d.execute-api.us-east-2.amazonaws.com/TEST1/recognition'------ NOMBRE

	URL= 'https://nzi2ziald8.execute-api.us-east-2.amazonaws.com/test/upload-file' ### ---IMAGEN

	headers = {"Content-Type": "application/json"}

	#r=requests.get()
	#params1 = { 'body':params }

	r = requests.request('POST',URL,json=params)

	salida=r.json()

	return salida

def AWS_CARGA(params):


	URL= 'https://qyl3pnz2gl.execute-api.us-east-2.amazonaws.com/test/carga' ### ---IMAGEN

	headers = {"Content-Type": "application/json"}

	#r=requests.get()
	#params1 = { 'body':params }

	r = requests.request('POST',URL,json=params)

	salida=r.json()

	return salida


def AWS_LIVENESS(params):


	URL= 'https://qyl3pnz2gl.execute-api.us-east-2.amazonaws.com/test/liveness-v2' ### ---IMAGEN

	headers = {"Content-Type": "application/json"}

	#r=requests.get()
	#params1 = { 'body':params }

	r = requests.request('POST',URL,json=params)

	salida=r.json()

	return salida


def AWS_CARGA_DNI(params):


	URL= 'https://mec2ph38s3.execute-api.us-east-2.amazonaws.com/Test/carga-dni' ### ---IMAGEN

	headers = {"Content-Type": "application/json"}

	#r=requests.get()
	#params1 = { 'body':params }

	r = requests.request('POST',URL,json=params)

	salida=r.json()

	return salida



if __name__=='__main__':
	AWS('gerson1.JPG')










