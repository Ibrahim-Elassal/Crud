
//  Crud Operations
var productNameInput = document.getElementById("productName");
var productpriceInput = document.getElementById("productprice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var updateBtn = document.getElementById("updateBtn");
var invalidName = document.getElementById("invalidName");

var productsContainer = []; 
var mainIndex = 0 ;

if(localStorage.getItem('products') != null){
    productsContainer  = JSON.parse(localStorage.getItem('products'));
    displayProducts (productsContainer);
}

function validateProductName (){
    var regEx = /^[A-Z][a-z]{3,}$/ 
    return regEx.test(productName.value);
}

function validateProductPrice (){
    var regEx = /^[0-9]{3,}$/ 
    return regEx.test(productprice.value);
}

function addProduct (){
    if(validateProductName () && validateProductPrice ()   ){
        var products ={
            productName :productNameInput.value  , 
            productprice :productpriceInput.value  , 
            productCategory :productCategoryInput.value  , 
            productDesc :productDescInput.value  , 
        }
        productsContainer.push(products);
        localStorage.setItem("products" , JSON.stringify(productsContainer) )
        displayProducts (productsContainer);
        clearForm ();
    }
    else {
        alert("Invalid Input")
    }
}

function displayProducts(arr){
    var cartoona = ``;

    for(var i=0 ;i< arr.length ; i++){
        cartoona += `
        <tr>
                        <td>${i}</td>
                        <td>${arr[i].productName}</td>
                        <td>${arr[i].productprice}</td>
                        <td>${arr[i].productCategory}</td>
                        <td>${arr[i].productDesc}</td>
                        <td> <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning">Update</button>  </td>
                        <td> <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button>  </td>
                    </tr> <br>  ` 
    }
    document.getElementById('tableBody').innerHTML = cartoona ;
}

function clearForm () {
    productNameInput.value = "";
    productpriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function deleteProduct (productIndex){
    productsContainer.splice(productIndex , 1);
    localStorage.setItem("products" , JSON.stringify(productsContainer))
    displayProducts(productsContainer);
}

function searchProducts (term ){
     var matchedProducts =[];
     console.log(term);
    for(var i=0 ; i<productsContainer.length ; i++){
        if(productsContainer[i].productName.toLowerCase().includes(term.toLowerCase()) ===true){
            matchedProducts.push(productsContainer[i]);
        }
    }
   console.log(matchedProducts)
   displayProducts(matchedProducts)
}

function setFormForUpdate(index){
    mainIndex = index ;
    addBtn.classList.replace("d-block" , "d-none");
    updateBtn.classList.replace("d-none" , "d-block");
    productNameInput.value = productsContainer[index].productName ;
    productpriceInput.value = productsContainer[index].productprice;
    productCategoryInput.value = productsContainer[index].productCategory;
    productDescInput.value = productsContainer[index].productDesc;

}

function updateProduct (){
    // console.log( mainIndex) 
    var products ={
        productName :productNameInput.value  , 
        productprice :productpriceInput.value  , 
        productCategory :productCategoryInput.value  , 
        productDesc :productDescInput.value  , 
    }
    productsContainer.splice(mainIndex , 1 , products);
    localStorage.setItem("products" , JSON.stringify(productsContainer) );
    displayProducts (productsContainer);
    clearForm ();
}