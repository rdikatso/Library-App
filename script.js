//open pop up form
let form = document.querySelector(".form-container");
function openForm(){
    document.getElementById("myForm").style.display = "block";
    form.reset();
}

function closeForm(){
    document.getElementById("myForm").style.display = "none";
}

let addBtn = document.querySelector(".add");
addBtn.addEventListener("click",openForm)

let closeBtn = document.querySelector(".btn-cancel");
closeBtn.addEventListener("click",closeForm);

function Book(title, author,pages,status){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = status,
    this.info = function(){
        return `${this.title} by ${this.author}, has ${this.pages} pages and I have ${this.status} it.`
    };
    
    
}
const books = getBooks();

books.forEach((book) => addBookToList(book));


function addBookToList(book){
    let container = document.querySelector(".grid");
    let div = document.createElement("div");
    div.className = "card";

    //create a new heading(title), author, pages and add it to the div

    let title = document.createElement("h3");
    title.className = "title";
    title.textContent = book.title;
    div.appendChild(title);

    let author = document.createElement("p");
    author.className = "author";
    author.textContent = book.author;
    div.appendChild(author);

    let innerDiv = document.createElement("div");
    innerDiv.className = "container";
    div.appendChild(innerDiv);

   if(book.status === "Yes"){
    let readButton = document.createElement("button");
    readButton.className = "read";
    readButton.textContent = "Read";
    innerDiv.appendChild(readButton);
   }

   if(book.status ==="No"){
    let unreadButton = document.createElement("button");
    unreadButton.className = "unread";
    unreadButton.textContent = "Not Read";
    innerDiv.appendChild(unreadButton);
   }

    let removeButton = document.createElement("button");
    removeButton.className = "remove";
    removeButton.textContent = "Remove";
    innerDiv.appendChild(removeButton);

    container.appendChild(div);
}

document.querySelector(".form-container").addEventListener("submit", (e) =>{
    // Prevent actual submit
    e.preventDefault();
    
    
    //Get form values 

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const status = document.querySelector("#status").value;

    let newBook = new Book(title, author, pages, status)
    console.log(newBook);
    // add book to list;

    books.push(newBook);
    console.log(books);
    addBookToList(newBook);
    addBook(newBook);
    closeForm();



});

document.querySelector(".grid").addEventListener("click", (e)=>{
    console.log(e.target);
    console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    deleteBook(e.target);
    readStatus(e.target);
    removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    
});

function deleteBook(target){
    if (target.classList.contains("remove")){
        target.parentElement.parentElement.remove();

    }

}

function readStatus(target){
    if (target.classList.contains("read")){
        target.textContent = "Not Read";
        target.classList.remove("read");
        console.log(target); 
    }else{
        target.classList.add("read");
        target.textContent = "Read";

    }
    
}
//Store books in local storage
function getBooks(){
    let books;
    if(localStorage.getItem("books") === null){
        books = [];
    }else{
       books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
}
//Add and delete books in local Storage 

function addBook(book){
    const books = getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

function removeBook(title){
    const books = getBooks();
    console.log(books);
    books.forEach((book,index) =>{
        console.log(book);
        console.log(index);
        if(book.title === title){
            console.log(book);
            console.log(index);

            books.splice(index,1)
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
    console.log(localStorage);
}
   
    










