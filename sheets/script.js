const config = {
  SHEET_ID: "1JUmwo8nhqq7irBXXSkFgmxeeFq4DkcaH-Bc5AVhjJtA",
  TABLE: {
    PRODUCTS: 'Produits',
    ORDERS: 'Commandes'
  }
};

/*
 * GET Requests
 */
function doGet(req){

  const action = req.parameter.action;
  // const tableReq = req.parameter.table;

  // const db = SpreadsheetApp.openById(config.SHEET_ID);
  // const table = db.getSheetByName(tableReq);

  switch(action) {
    // case "read":
    //   return Read(req, table);
    //   break;
    // case "insert":
    //   return Insert(req, table);
    //   break;
    // case "update":
    //   return Update(req, table);
    //   break;
    // case "delete":
    //   return Delete(req, table);
    //   break;
    case "getProducts":
      return GetProduct(req);
      break;
    case "addOrder":
      return AddOrder(req);
      break;
    case "getOrder":
      return GetOrder(req);
      break;
    case "updateOrder":
      return UpdateOrder(req);
      break;
    default:
      break;
  }
}

function GetProduct(request){

  const db = SpreadsheetApp.openById(config.SHEET_ID);
  const table = db.getSheetByName(config.TABLE.PRODUCTS);
  return Read(request, table);

}

function GetOrder(request){

  const db = SpreadsheetApp.openById(config.SHEET_ID);
  const table = db.getSheetByName(config.TABLE.ORDERS);
  const id = request.parameter.id;

  const order = _read(table, id);

  if(!order || Array.isArray(order)){

    throw new Error('order not found');

  }

  return response().json({
    success: true,
    data: order
  });

}

function testRead(){

  const id = 'a7d11b8a-bbc4-46e0-a2c1-4f258a76c1c1'
  const db = SpreadsheetApp.openById(config.SHEET_ID);
  const table = db.getSheetByName(config.TABLE.ORDERS);
  const orders = _read(table, id);
}

function AddOrder(request){

  const db = SpreadsheetApp.openById(config.SHEET_ID);
  const table = db.getSheetByName(config.TABLE.ORDERS);
  const rawOrder = JSON.parse(request.parameter.data);
  rawOrder.id = Utilities.getUuid();
  const order = {
    Id: rawOrder.id,
    'Date de commande': (new Date() ).toISOString().split('T')[0],
    'Date de livraison': rawOrder.deliveryDate,
    Nom: rawOrder.name,
    'E-mail': rawOrder.email,
    Telephone: rawOrder.phone,
    Rue: rawOrder.address.street,
    Ville: rawOrder.address.city,
    'Code postal': rawOrder.address.postalCode,
    Produits: rawOrder.products.reduce( (acc, product) =>
      `${acc}${product.group ? `${product.group} - ` : ''}${product.name}:${product.quantity};`, '')
  };

  sendEmailNewOrderUser(rawOrder);

  return Insert(order, table);

}

function UpdateOrder(request){

  const db = SpreadsheetApp.openById(config.SHEET_ID);
  const table = db.getSheetByName(config.TABLE.ORDERS);
  const rawOrder = JSON.parse(request.parameter.data);
  const order = {
    Id: rawOrder.id,
    'Date de commande': (new Date() ).toISOString().split('T')[0],
    'Date de livraison': rawOrder.deliveryDate,
    Nom: rawOrder.name,
    'E-mail': rawOrder.email,
    Telephone: rawOrder.phone,
    Rue: rawOrder.address.street,
    Ville: rawOrder.address.city,
    'Code postal': rawOrder.address.postalCode,
    Produits: rawOrder.products.reduce( (acc, product) =>
      `${acc}${product.group ? `${product.group} - ` : ''}${product.name}:${product.quantity};`, '')
  };

  sendEmailNewOrderUser(rawOrder);

  return Update(rawOrder.id, order, table);

}

function getEmailProductLine(product){
  return `<tr>
    <td align="left" width="50%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">${product.label}</td>
    <td align="left" width="25%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">${product.quantity.toString().replace('.', ',')}</td>
    <td align="left" width="25%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">${(product.quantity * product.unitPrice).toFixed(2).replace('.', ',')} €</td>
  </tr>`;
}

function testSendEmail(){

  const order = {
    "id":"id1",
    "email":"julesgoullee@gmail.com",
    "name":"jules goullee",
    "phone":"+33632111276",
    "address":{"street":"7 chemin de castagney est","city":"sainte terre","postalCode":"33350"},
    "products":[{"id":"49bab883-2efa-4abd-b252-6f547c0c547d","name":"Roti de porc confit","group":"","label":"Roti de porc confit (25.00€/kg)","unitPrice":25,"unit":"kg","quantity":1.2}],
    "total":30,
    "deliveryDate":"2020-07-24"
  };

  return sendEmailNewOrderUser(order);

}

function sendEmailNewOrderUser(order){

  const mailNewOrderUserTemplate = HtmlService
    .createTemplateFromFile('mail-new-order-user').evaluate().getContent();

  const mailNewOrderUser = mailNewOrderUserTemplate
    .split('{{ORDER_ID}}').join(order.id)
    .split('{{EMAIL}}').join(order.email)
    .split('{{NAME}}').join(order.name)
    .split('{{phone}}').join(order.phone)
    .split('{{ADDRESS.STREET}}').join(order.address.street)
    .split('{{ADDRESS.CITY}}').join(order.address.city)
    .split('{{ADDRESS.POSTAL_CODE}}').join(order.address.postalCode)
    .split('{{TOTAL}}').join(order.total.toFixed(2).replace('.', ',') )
    .split('{{DELIVERY_DATE}}').join(new Date(order.deliveryDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) )
    .split('{{ITEMS}}').join(order.products.reduce( (acc, product) => `${acc}${getEmailProductLine(product)}`, '') );

  return MailApp.sendEmail({
    to: order.email,
    from: `Ferme a l'assiette`,
    subject: "Confirmation de commande",
    htmlBody: mailNewOrderUser
  });

}

function sendNewOrderAdmin(){

}

function sendMail(template, email) {

  var email = 'jules@amon.tech';

  var message = templ.evaluate().getContent();

  MailApp.sendEmail({
    to: email,
    subject: "Test",
    htmlBody: message
  });
}

/* Read
 * request for all tables
 *
 * @parameter action=read
 * @parameter table=<TABLE_NAME>
 * @parameter id=<COLUMN_ID>
 *
 * @example-request | ?action=read&table=<TABLE_NAME>
 * @example-request-single-row | ?action=read&table=<TABLE_NAME>&id=<ROW_NUMBER>
 */
function Read( request, table ) {

  var request_id = request.parameter.id;

  return response().json({
    success: true,
    data: _read( table, request_id )
  });

}

function InsertTest( ) {

  const db = SpreadsheetApp.openById(config.SHEET_ID);
  const table = db.getSheetByName(config.TABLE.ORDERS);
  const data = {
    Id: Utilities.getUuid(),
    'Date de commande': '1',
    'Date de livraison': 'deliveryDate',
    Nom: 'name',
    'E-mail': 'email',
    Telephone: 'phone',
    Rue: 'street',
    Ville: 'city',
    'Code postal': 'postalCode',
    'Produits': 'p1,p2'
  };

  return Insert(data, table);

}

/* Insert
 * dynamic for all data
 *
 * @parameter action=insert
 * @parameter table=<TABLE_NAME>
 * @parameter data=JSON
 *
 * @example-request | ?action=insert&table=<TABLE_NAME>&data={"name":"John Doe"}
 */
function Insert( data, table ) {
  var errors = [];

  var last_col     = table.getLastColumn();
  var first_row    = table.getRange(1, 1, 1, last_col).getValues();
  var headers      = first_row.shift();
  var new_row;
  var result = {};

  try {
    new_row = prepareRow( data, headers );
    table.appendRow( new_row );

    result.success = true;
    result.data = data;

  } catch ( error ) {
    result.success = false;
    result.data = error;
  }

  return response().json( result );
}

/* Update
 * dynamic for all tables
 *
 * @parameter action=update
 * @parameter table=<TABLE_NAME>
 * @parameter id=<COLUMN_ID>
 * @parameter data=JSON
 *
 * @example-request | ?action=update&table=<TABLE_NAME>&id=<ID>&data={"col_to_update": "value" }
 */
function Update(id, data, table) {
  var last_col      = table.getLastColumn();
  var first_row     = table.getRange(1, 1, 1, last_col).getValues();
  var headers       = first_row.shift();

  var request_id    = id;
  var current_data  = _read( table, request_id );

  var result = {};

  try {
    var current_row   = current_data.row;
    for( var object_key in data ) {
      var current_col = headers.indexOf( object_key ) + 1;
      table.getRange( current_row, current_col ).setValue( data[ object_key ]); // update iteratively
      current_data[ object_key ] = data[ object_key ]; // update for response;
    }
    result.successs = true;
    result.data = current_data;
  } catch ( error ) {
    result.success = false;
    result.data = error;
  }

  return response().json( result );
}

/* Delete
 * dynamic for all tables
 *
 * @parameter action=delete
 * @parameter table=<TABLE_NAME>
 * @parameter id=<COLUMN_ID>
 *
 * @example-request | ?action=update&table=<TABLE_NAME>&id=<ID>
 */
function Delete( request, table ) {
  var request_id    = Number( request.parameter.id );
  var current_data  = _read( table, request_id );

  // delete
  table.deleteRow( current_data.row );

  return response().json({
    success: true,
    data: current_data
  });
}

/**
 * Build the response content type
 * back to the user
 */
function response() {
  return {
    json: function(data) {
      return ContentService
        .createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
}

/**
 * Read from sheet and return map key-value
 * javascript object
 */
function _read( sheet, id ) {
  var data         = sheet.getDataRange().getValues();
  var header       = data.shift();

  // Find All
  var result = data.map(function( row, indx ) {
    var reduced = header.reduce( function(accumulator, currentValue, currentIndex) {
      accumulator[ currentValue ] = row[ currentIndex ];
      return accumulator;
    }, {});

    reduced.row = indx + 2;
    return reduced;

  });

  // Filter if id is provided
  if( id ) {
    return result.find( function(record){ return record.Id === id});
  }

  return result;

}

/*
 * Prepare row with correct order to insert into
 * sheet.
 *
 * @throws Error
 */
function prepareRow( object_to_sort, array_with_order ) {
  var sorted_array   = [];

  for( var i=0; i<array_with_order.length; i++ ) {
    var value = object_to_sort[ array_with_order[ i ]];

    if( !value ) {
      throw new Error( "The attribute/column <" + array_with_order[i] + "> is missing." );
    } else {
      sorted_array[i] = value;
    }
  }

  return sorted_array;
}
