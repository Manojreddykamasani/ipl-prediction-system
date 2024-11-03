from flask import Flask,request,jsonify
from tensorflow.keras.models import load_model
import joblib as jb
import sklearn
from flask_cors import CORS 
import numpy as np
app = Flask(__name__)
CORS(app)
model = load_model('./finalised.h5')
scaler= jb.load("scaler.pkl")
@app.route('/predict',methods=['POST'])
def predict():
    data=request.get_json()
    data=data['input']
    if not data:
        return jsonify({"error":"no input data"})
    if(data[5]!=data[0] and data[5]!=data[1]):
        data[5]=-1
    data[3]=data[3]*10
    data=scaler.transform([data])
    input_data= np.array(data,dtype=np.float32)
    input_data=np.reshape(input_data,(1,1,7))
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
    