"use client";

/**
 * @see https://v0.dev/t/G1AjfPtt07d
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export function AllQuizzesTable() {
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState({ column: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getAllQuizzes");
        setAllQuizzes(response.data);
        console.log("All Quizzes: ", allQuizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const tableData = [
  //   { name: "John Doe", email: "johndoe@example.com", status: "Active" },
  //   { name: "Jane Doe", email: "janedoe@example.com", status: "Inactive" },
  //   { name: "Bob Smith", email: "bobsmith@example.com", status: "Active" },
  // ];

  const handleSort = (column) => {
    let direction = "asc";
    if (sortOrder.column === column && sortOrder.direction === "asc") {
      direction = "desc";
    }
    setSortOrder({ column, direction });
  };

  const filteredData = allQuizzes.length
    ? allQuizzes.filter((item) =>
        Object.values(item).some((value) => {
          if (value !== null && value !== undefined) {
            return value
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          }
          return false;
        })
      )
    : [];

  const sortedData = () => {
    if (sortOrder.column === "topic" || sortOrder.column === "timeStarted") {
      const sorted = [...filteredData].sort((a, b) => {
        const firstValue = a[sortOrder.column];
        const secondValue = b[sortOrder.column];

        if (
          (sortOrder.column === "topic" ||
            sortOrder.column === "timeStarted") &&
          typeof firstValue === "string" &&
          typeof secondValue === "string"
        ) {
          return sortOrder.direction === "asc"
            ? firstValue.localeCompare(secondValue)
            : secondValue.localeCompare(firstValue);
        }
        return 0;
      });
      return sorted;
    }
    return filteredData;
  };

  const totalPages = Math.ceil(sortedData().length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData().slice(indexOfFirstItem, indexOfLastItem);

  const paginationLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationLinks.push(
      <PaginationItem key={i}>
        <PaginationLink
          href="#"
          onClick={() => handlePageChange(i)}
          isActive={i === currentPage}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div className="px-4 py-3 bg-white sm:px-6">
            <div className="flex items-center justify-evenly">
              <Input
                className="mr-6"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={() => console.log("Search clicked")}
              >
                <SearchIcon className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
          {allQuizzes.length === 0 ? (
            <div>Fetching Quizzes...</div>
          ) : (
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHeader className="flex items-center justify-evenly">
                <TableRow>
                  <TableHead
                    className="w-[100px]"
                    onClick={() => handleSort("topic")}
                  >
                    <Button
                      className="shrink-0"
                      variant="outline"
                      onClick={() => handleSort("topic")}
                    >
                      <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                      Name
                    </Button>
                  </TableHead>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead className="w-[100px]">Author</TableHead>
                  <TableHead
                    className="w-[100px]"
                    onClick={() => handleSort("timeStarted")}
                  >
                    <Button
                      className="shrink-0"
                      variant="outline"
                      onClick={() => handleSort("timeStarted")}
                    >
                      <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                      Created At
                    </Button>
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <Link href={`/student/quiz/instructions/${row.id}`}>
                        {row.topic}
                      </Link>
                    </TableCell>
                    <TableCell>{row.quizType}</TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>
                      {` ${new Date(row.timeStarted).toLocaleTimeString()},
                      ${new Date(row.timeStarted).toLocaleDateString()}`}
                    </TableCell>
                    <TableCell>
                      <Link href={`/student/quiz/instructions/${row.id}`}>
                        <Button>Take Quiz</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className="px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button variant="outline">Previous</Button>
                <Button>Next</Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, sortedData().length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{sortedData().length}</span>{" "}
                    results{"\n                                  "}
                  </p>
                </div>
                <div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        {currentPage !== 1 && (
                          <PaginationPrevious
                            href="#"
                            onClick={() =>
                              handlePageChange(Math.max(currentPage - 1, 1))
                            }
                          />
                        )}
                      </PaginationItem>
                      {paginationLinks}
                      <PaginationItem>
                        {currentPage !== totalPages && (
                          <PaginationNext
                            href="#"
                            onClick={() =>
                              handlePageChange(
                                Math.min(currentPage + 1, totalPages)
                              )
                            }
                          />
                        )}
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ArrowUpDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}
