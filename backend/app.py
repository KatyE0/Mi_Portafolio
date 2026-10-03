from flask import Flask, request
from flask import render_template as ren_t

#Bibliotecas para hacer la coneccxion aon SMPT de gmail

from dotenv import load_dotenv as env
import smtplib
import os
from email.message import EmailMessage as e_mensj

# Cargar las variables del archivo .env
env()

app = Flask(
    __name__,
    template_folder="../frontend/templates",
    static_folder="../frontend/static"
)

#Busca la ruta del formulario de contacto dentro de index.html
@app.route("/")
def inicio():
    return ren_t("index.html")

#ontiene los datos del formulacio contacto con metodo post
@app.route("/contacto", methods=["POST"])
def contacto():
    
    #Obtenemos valores y le asignamos var en py
    nombre = request.form["nombre"]
    email = request.form["email"]
    telefono = request.form["telefono"]
    mensaje = request.form["mensaje"]
    
    #Imprimo datos en terminal
    #print("Nombre:", nombre)
    #print("Email:", email)
    #print("Teléfono:", telefono)
    #print("Mensaje:", mensaje)
    
    #Datos del correo
    correo_emisor = os.getenv("EMAIL_USER")
    contraseña = os.getenv("EMAIL_PASSWORD")
    correo_destino = os.getenv("EMAIL_DESTINO")
    
    # Crear el correo
    correo = e_mensj()

    correo["Subject"] = f"Nuevo mensaje de {nombre}"
    correo["From"] = correo_emisor
    correo["To"] = correo_destino

    correo.set_content(
        f"""
        Has recibido un nuevo mensaje desde tu portafolio.
        Nombre: {nombre}
        Correo: {email}
        Teléfono: {telefono}
        Mensaje:{mensaje}
        """
    )

    try:

        # Conectarse con Gmail
        with smtplib.SMTP("smtp.gmail.com", 587) as servidor:

            servidor.starttls()

            servidor.login(correo_emisor, contraseña)

            servidor.send_message(correo)

        print("Correo enviado correctamente.")

        return "¡Mensaje enviado correctamente! Gracias por contactarme."

    except Exception as error:

        print("Error al enviar el correo:", error)

        return "Ocurrió un error al enviar el mensaje."
    

    #return "¡Mensaje recibido correctamente!"


if __name__ == "__main__":
    app.run(debug=True)