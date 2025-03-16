from flask import Flask,jsonify,request
from flask_cors import CORS
app=Flask(__name__)
from random import random
CORS(app)
arr=[]
class Game:
    player1,player2=0,0
    count={}
    values={}
    code=0
    gameover=False
    unoarr=[]
    def __init__(self):
        self.code=int(random()*1000000)
        self.player1=int(random()*1000000)
        self.unoarr=Uno()
    def add_player(self):
        self.player2=int(random()*1000000)
        self.count={
            self.player1:True,
            self.player2:False
        }
        self.values={
            self.player1:"X",
            self.player2:"0"
        }
    def verify(self):
        if self.unoarr.arr[0] != "" and self.unoarr.arr[0] == self.unoarr.arr[1] == self.unoarr.arr[2]:
            self.gameover=True
            return True
        if self.unoarr.arr[3] != "" and self.unoarr.arr[3] == self.unoarr.arr[4] == self.unoarr.arr[5]:
            self.gameover=True
            return True
        if self.unoarr.arr[6] != "" and self.unoarr.arr[6] == self.unoarr.arr[7] == self.unoarr.arr[8]:
            self.gameover=True
            return True

        if self.unoarr.arr[0] != "" and self.unoarr.arr[0] == self.unoarr.arr[3] == self.unoarr.arr[6]:
            self.gameover=True
            return True
        if self.unoarr.arr[1] != "" and self.unoarr.arr[1] == self.unoarr.arr[4] == self.unoarr.arr[7]:
            self.gameover=True
            return True
        if self.unoarr.arr[2] != "" and self.unoarr.arr[2] == self.unoarr.arr[5] == self.unoarr.arr[8]:
            self.gameover=True
            return True

        if self.unoarr.arr[0] != "" and self.unoarr.arr[0] == self.unoarr.arr[4] == self.unoarr.arr[8]:
            self.gameover=True
            return True
        if self.unoarr.arr[2] != "" and self.unoarr.arr[2] == self.unoarr.arr[4] == self.unoarr.arr[6]:
            self.gameover=True
            return True

        return False



class Uno:
    arr
    def __init__(self):
        self.arr=["","","","","","","","",""]
    def insert(self,indx,value):
        if self.arr[indx]!='X' and self.arr[indx]!='0':
            self.arr[indx]=value
            return True
        return False
@app.route('/initialize')
def initialize():
    try:
        game=Game()
        arr.append(game)
        return jsonify({"code":game.code,"player1":game.player1})
    except Exception as e:
        print(e)
        return "error"
@app.route('/addplayer/<code>')
def add_player(code):
    try:
        for i in arr:
            if i.code==int(code):
                i.add_player()
                return jsonify({"code":code,"player2":i.player2}),200
        return "not found",404
    except Exception as e:
        print(e)
        return "error"
@app.route('/change/<code>',methods=['POST'])
def change(code):
    try:
        indx=int(request.json.get('indx'))-1
        playerid=int(request.json.get('playerid'))
        print(playerid)
        for i in arr:
            if i.code==int(code):
                if i.count.get(playerid):
                    val=i.unoarr.insert(indx,i.values[playerid])
                    if val:
                        i.count[playerid]=not i.count[playerid]
                        print(i.count)
                        for j in i.count:
                            if j != playerid:
                                print(j)
                                i.count[j] = not i.count[j]
                                break
                        flag=i.verify() 
                        if(flag): 
                             return jsonify({"gameover":i.gameover,"code":code,"bool":True,"state":i.unoarr.arr,"players_state":i.count}),200  
                        return jsonify({"gameover":i.gameover,"code":code,"bool":False,"state":i.unoarr.arr,"players_state":i.count}),200
                    return "no access",403
                return "not your turn ",404
        return "not found",404
    except Exception as e:
        print(e)
        return "error" 
@app.route('/update/<code>',methods=['PUT'])
def update(code):
    try:
        for i in arr:
            if i.code==int(code):
                i.gameover=False
                i.count={
                    i.player1:True,
                    i.player2:False
                    }
                i.unoarr.arr=["","","","","","","","",""]
                return jsonify({"code":code,"state":i.unoarr.arr,"gameover":i.gameover}),200
        return "not found",404
    except Exception as e:
        print(e)
        return "error"
@app.route('/getstate/<code>')
def getstate(code):
    try:
        for i in arr:
            if i.code==int(code):
                return jsonify({"code":code,"state":i.unoarr.arr,"gameover":i.gameover}),200
        return "not found",404
    except Exception as e:
        print(e)
        return "error"  
    
if __name__=="__main__":
    app.run(debug=True)