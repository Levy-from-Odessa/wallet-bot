"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../models'),
    sequelize = _require.sequelize;

var _require2 = require('../models'),
    Operation = _require2.Operation,
    Tag = _require2.Tag,
    Operation_Type = _require2.Operation_Type;

module.exports = {
  index: function index(req, res) {
    var operations;
    return regeneratorRuntime.async(function index$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(Operation.findAll({
              include: [{
                model: Operation_Type
              } // {model: Tag, required: true},
              ]
            }));

          case 3:
            operations = _context.sent;
            res.send(operations);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(400).send({
              error: 'i have no operations'
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  getItem: function getItem(req, res) {
    var _id, operation;

    return regeneratorRuntime.async(function getItem$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _id = req.params.id;
            _context2.next = 4;
            return regeneratorRuntime.awrap(Operation.findOne({
              where: {
                id: _id
              },
              include: [{
                model: Tag
              }]
            }));

          case 4:
            operation = _context2.sent;
            res.send(operation);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            res.status(400).send({
              error: 'i have no operation' + id
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 8]]);
  },
  post: function post(req, res) {
    var _req$body, tags, type, operationType, operation, result;

    return regeneratorRuntime.async(function post$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body = req.body, tags = _req$body.tags, type = _req$body.type;
            _context4.next = 4;
            return regeneratorRuntime.awrap(Operation_Type.findOrCreate({
              where: {
                name: type
              },
              "default": {
                name: type
              }
            }));

          case 4:
            operationType = _context4.sent[0].id;
            _context4.next = 7;
            return regeneratorRuntime.awrap(Operation.create(_objectSpread({}, req.body, {
              operationTypeId: operationType
            })));

          case 7:
            operation = _context4.sent;
            _context4.next = 10;
            return regeneratorRuntime.awrap(Promise.all(tags.map(function _callee(tag) {
              var itemTag;
              return regeneratorRuntime.async(function _callee$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return regeneratorRuntime.awrap(Tag.findOrCreate({
                        where: {
                          name: tag
                        },
                        "default": {
                          name: tag
                        }
                      }));

                    case 2:
                      itemTag = _context3.sent[0];
                      _context3.next = 5;
                      return regeneratorRuntime.awrap(operation.addTag(itemTag));

                    case 5:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            })));

          case 10:
            _context4.next = 12;
            return regeneratorRuntime.awrap(Operation.findOne({
              where: {
                id: operation.id
              },
              include: [{
                model: Operation_Type
              }, {
                model: Tag
              }]
            }));

          case 12:
            result = _context4.sent;
            res.send(result);
            _context4.next = 19;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](0);
            res.status(400).send({
              description: 'while trying to add operation',
              error: _context4.t0
            });

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 16]]);
  },
  "delete": function _delete(req, res) {
    var _id2;

    return regeneratorRuntime.async(function _delete$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _id2 = req.body.id;
            _context5.next = 4;
            return regeneratorRuntime.awrap(Operation.destroy({
              where: {
                id: _id2
              }
            }));

          case 4:
            res.send('successful' + _id2);
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            res.status(400).send({
              error: 'Cant delete'
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  edit: function edit(req, res) {
    var _id3, operation;

    return regeneratorRuntime.async(function edit$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _id3 = req.body.id;
            _context6.next = 4;
            return regeneratorRuntime.awrap(Operation.findOne({
              where: {
                id: _id3
              },
              include: [{
                model: Operation,
                attributes: ['name', 'color']
              }]
            }));

          case 4:
            operation = _context6.sent;
            operation.update(req.body);
            res.send({
              operation: operation
            });
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            res.status(400).send({
              error: 'cant udate'
            });

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 9]]);
  },
  getAmount: function getAmount(req, res) {
    var groupBy, totalAmount;
    return regeneratorRuntime.async(function getAmount$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            groupBy = req.query.groupBy;
            console.log(groupBy);
            _context7.next = 5;
            return regeneratorRuntime.awrap(Operation.findAll({
              attributes: [groupBy, [sequelize.fn('sum', sequelize.col('price')), 'total_amount']],
              group: [groupBy]
            }));

          case 5:
            totalAmount = _context7.sent;
            res.send({
              totalAmount: totalAmount
            });
            _context7.next = 12;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);
            res.status(400).send({
              error: 'cant update' + _context7.t0
            });

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 9]]);
  }
};