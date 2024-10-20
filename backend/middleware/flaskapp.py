from flask import Flask,request,jsonify
from tensorflow.keras.models import load_model
from flask_cors import CORS
import numpy as np
app = Flask(__name__)
CORS(app)
model = load_model('./lstm.h5')
@app.route('/predict',methods=['POST'])
def predict():
    data=request.get_json()
    data=data['input']
    data[5]=int(data[5])
    data[3]=data[3]*10
    print(data)
    if not data:
        return jsonify({"error":"no input data"})
    input_data= np.array(data,dtype=np.float32)
    input_data=np.reshape(input_data,(1,1,6))
    prediction= model.predict(input_data)
    prediction=np.argmax(prediction)
    inv={
    1: 'Chennai Super Kings',
    2: 'Delhi Capitals',
    3: 'Kolkata Knight Riders',
    4: 'Mumbai Indians',
    5: 'Punjab Kings',
    6: 'Rajasthan Royals',
    7: 'Royal Challengers Bangalore',
    8: 'Sunrisers Hyderabad',
    9: 'Lucknow Super Giants',
    10: 'Gujarat Titans'
}
    return jsonify({'prediction':inv[prediction]})
if __name__=='__main__':
    app.run(debug=True,port=5000)
    