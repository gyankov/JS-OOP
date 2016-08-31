/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [];
		var categories = [];
		function listBooks() {
			return JSON.parse(JSON.stringify(books)).sort(x=> x.ID);
		}

		function addBook(book) {
            validateBook(book);
            validateBookAuthor(book);
            validateUniqueIdAndISBN(book);
            validateISBN(book);

			book.ID = books.length + 1;
			books.push(book);
            if (categories.indexOf(book.category)<0) {
                categories.push(book.category);                
            }

			return book;
		}
        
		function listCategories() {
			return JSON.parse(JSON.stringify(categories)).sort(x=> x.ID);;
		}

        function validateBook(book) {

            var titleLength = book.title.length;
            var categoryLength = book.category.length;
            if ((titleLength <2 || titleLength> 100) || (categoryLength<2 || 100< categoryLength ) ) {
                throw new Error();
            }
            
        }

        function validateBookAuthor(book) {
            if (book.author === '') {
                throw new Error();
            }
        }

        function validateISBN(book) {
            if (book.ISBN.length != 13 && book.ISBN.length !=10) {
                throw new Error();
            }
        }

        function validateUniqueIdAndISBN(book) {           
            books.forEach(function (b) {
                if (b.ID === book.ID || b.ISBN === book.ISBN) {
                    throw new Error();
                }
            })
        }

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;