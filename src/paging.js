import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
const Paging = ({ pageUpdate, defaultPage }) => {
  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink first href="#" />
      </PaginationItem>
      <PaginationItem disabled={defaultPage === 1 ? true : false}>
        <PaginationLink onClick={() => pageUpdate(defaultPage - 1)} previous />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={() => pageUpdate(1)}>1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={() => pageUpdate(2)}>2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={() => pageUpdate(3)}>3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={() => pageUpdate(4)}>4</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={() => pageUpdate(5)}>
          {defaultPage <= 5 ? 5 : defaultPage}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={() => pageUpdate(defaultPage + 1)} next />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" last />
      </PaginationItem>
    </Pagination>
  );
};
export default Paging;
