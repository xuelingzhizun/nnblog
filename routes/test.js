const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const UserModel = mongoose.model('users');
// 回调
router.get('/1', (req, res) => {
  console.log('1');
  UserModel.findOne({}, (err, auser) => { console.log('2'); });
  console.log(3);
});

function p2(i) {
  return new Promise(
    (resolve) => {
      setTimeout(() => { console.log(i); resolve(i); }, 5000);
    });
}


// 自带promise
router.get('/2', (req, res) => {
  console.log('4');
  UserModel.findOne({})
    .then((i) => { console.log(i); i++; })
    .then((i) => { console.log(i); i++; })
    .then(p2)
    .then(() => { console.log(i); i++; })
    .then(() => { console.log(i); i++; })
    .then(p2)
    .then(() => { console.log(i); i++; });
  console.log(6);
});

function f() {
  return new Promise(
    ((resolve) => {
      console.log(0);
      resolve();
    }),
  );
}

// function f(){
//   return new Promise(
//     function(resolve){
//       console.log(0);
//       resolve();
//     }
//   );
// }


function f1() {
  return new Promise((resolve) => { console.log(1); resolve(); });
}

function f2() {
  return new Promise(
    () => {
      setTimeout(() => { console.log('2'); }, 4);
    },
  );
}

function f3() {
  return new Promise((resolve) => { console.log(3); resolve(); });
}

// 自创promise
router.get('/3', (req, res) => {
  console.log('4');
  UserModel.findOne({}).then(f1).then(f2).then(f3);
  console.log(6);
});

// 直接返回Promise
function pro1() {
  return new Promise((resolve, reject) => {
    if (true) setTimeout(() => { console.log(1); resolve(); }, 0);
    else setTimeout(() => { console.log(1); resolve(); }, 0);
  });
}
function pro2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => { console.log(200000); resolve(); }, 200000);
  });
}
function pro3() {
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => { console.log(3); resolve(); }, 0);
    });
}

// 摘抄promise
router.get('/4', (req, res) => {
  console.log('4');
  UserModel.findOne({}).then(pro1).then(pro2).then(pro3);
  console.log(6);
});


module.exports = router;
