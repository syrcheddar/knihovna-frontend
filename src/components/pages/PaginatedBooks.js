import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

function PaginatedBooks({ books, itemsPerPage }) {
	let navigate = useNavigate();
	const [promisedBooks, setBooks] = useState(books);
	// We start with an empty list of items.
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);
	useEffect(() => {
		setBooks(books);
	}, [books]);
	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(promisedBooks.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(promisedBooks.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, promisedBooks]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % promisedBooks.length;
		window.scrollTo(0, 0);
		setItemOffset(newOffset);
	};

	return (
		<>
			<Container className="books">
				{currentItems != null
					? currentItems.map((book) => {
							return (
								<Row
									className="book"
									onClick={() => {
										navigate("/books/b/" + book[0]);
									}}
								>
									<div>
										<h5>{book[1]}</h5>
									</div>
									<div className="details">
										<h5>{book[2] + " " + book[3]}</h5>
										<h6>ISBN: {book[0]}</h6>
									</div>
								</Row>
							);
					  })
					: ""}
			</Container>
			<Row style={{ marginTop: "15px", justifyContent: "center" }}>
				<ReactPaginate
					className="paginate"
					breakLabel="..."
					nextLabel=">"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel="<"
					renderOnZeroPageCount={null}
				/>
			</Row>
		</>
	);
}
export default PaginatedBooks;
