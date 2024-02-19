import * as React from "react";
import PropTypes from "prop-types";
import Data from "../data/data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const rows = Data;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "ID",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "SHPIIFY",
    numeric: true,
    disablePadding: false,
    label: "SHPIIFY",
  },
  {
    id: "DATE",
    numeric: true,
    disablePadding: false,
    label: "DATE",
  },
  {
    id: "STATUS",
    numeric: true,
    disablePadding: false,
    label: "STATUS",
  },
  {
    id: "CUSTOMER",
    numeric: true,
    disablePadding: false,
    label: "CUSTOMER",
  },
  {
    id: "EMAIL",
    numeric: false,
    disablePadding: false,
    label: "EMAIL",
  },
  {
    id: "COUNTRY",
    numeric: true,
    disablePadding: false,
    label: "COUNTRY",
  },
  {
    id: "SHIPPING",
    numeric: true,
    disablePadding: false,
    label: "SHIPPING",
  },
  {
    id: "SOURCE",
    numeric: true,
    disablePadding: false,
    label: "SOURCE",
  },
  {
    id: "ORDERTYPE",
    numeric: true,
    disablePadding: false,
    label: "ORDER TYPE",
  },
  {
    id: "EDIT",
    numeric: false,
    disablePadding: false,
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </div>
          </th>
          {headCells.map((headCell) => (
            <th
              key={headCell.id}
              className={`align-${headCell.numeric ? "right" : "left"} ${
                headCell.disablePadding ? "p-0" : "p-3"
              }`}
            >
              <button
                className="btn btn-link"
                onClick={() => createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id && (
                  <span className="visually-hidden">
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                )}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.id}>
            <th scope="row">{index + 1}</th>
            <td>{row.firstName}</td>
            <td>{row.lastName}</td>
            <td>{row.handle}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, count, page, onChangePage } = props;
  const [personName, setPersonName] = React.useState("");
  const [selectedLabel, setSelectedLabel] = React.useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedLabel(value);
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="row g-0">
      <div className="col-sm-2 col-md-4">
        <h5 style={{ fontSize: "18px", fontWeight: "700" }}>Product Summary</h5>
      </div>
      <div className="col-2 col-md-1">
        <p style={{ fontSize: "16px", fontWeight: "400", marginTop: "5px" }}>Show</p>
      </div>
      <div className="col-sm-2 col-md-2 ml-100">
        <select
          className="form-select"
          style={{ minWidth: 120, maxWidth: "100%", fontWeight: "500", }}
          value={personName}
          onChange={handleChange}
        >
          <option selected style={{ fontWeight: "900" }}>
            ALL COLUMNS
          </option>
          {headCells.map((headCell) => (
            <option key={headCell.id} value={headCell.id}>
              {headCell.label}
            </option>
          ))}
        </select>
      </div>
      <div className="col-2 col-md-2">
        <button type="button" className="btn btn-primary" style={{ marginLeft: "5px", marginRight: "10px", fontSize: "12px", width:"150px", height: "40px" }}>
          DISPATCH SELECTED
        </button>
      </div>
      <div className="col-sm-2 col-md-1">
        <nav aria-label="Page navigation ml-50">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {Array.from(Array(count).keys()).map((index) => (
              <li
                key={index}
                className={`page-item ${index + 1 === page ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  type="button"
                  onClick={() => onChangePage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
   
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ rowss }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchInput, setSearchInput] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectSource, setSelectSource] = React.useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.ID);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, ID) => {
    const selectedIndex = selected.indexOf(ID);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ID);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (ID) => selected.indexOf(ID) !== -1;

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchInput.toLowerCase()) &&
        (selectedStatus === "" || row.STATUS === selectedStatus)
    )
  );
  const filteredRows1 = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchInput.toLowerCase()) &&
        (selectSource === "" || row.SOURCE === selectSource)
    )
  );

  const emptyRows =
    page >= 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(
        filteredRows || filteredRows1,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows, filteredRows1]
  );

  const [personName, setPersonName] = React.useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    setSelectedStatus(value);
  };
  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setSelectSource(value);
  };

  return (
    <>
      <div className="card shadow bg-body-tertiary mt-3">
        <div className="container mt-3 mb-3">
          <div className="row">
            <div className="col-md-5 col-xs-12">
              <div className="input-styling1">
                <h5 style={{ fontSize: "15px", fontWeight: "800" }}>
                  What are you looking for?
                </h5>
                <input
                  id="input-with-icon-adornment"
                  className="form-control"
                  placeholder="Search for category name, Company, etc"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2 col-xs-6">
              <div className="input-styling">
                <h5 style={{ fontSize: "15px", fontWeight: "800" }}>
                  Category
                </h5>
                <select
                  className="form-select"
                  id="outlined-select-currency"
                  value={personName}
                  onChange={handleChange1}
                >
                  <option value="">All</option>
                  <option value="Local">Local</option>
                  <option value="Standard">Standard</option>
                  <option value="Express">Express</option>
                </select>
              </div>
            </div>
            <div className="col-md-2 col-xs-6">
              <div className="input-styling">
                <h5 style={{ fontSize: "15px", fontWeight: "800" }}>Status</h5>
                <select
                  className="form-select"
                  id="outlined-select-currency"
                  value={personName}
                  onChange={handleChange}
                >
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
            <div className="col-md-1 col-xs-6 mt-4">
              <button className="btn btn-outline-secondary filter">
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
            </div>
            <div className="col-md-2 col-xs-6 mt-4">
              <button
                style={{
                  width: "150px",
                  height: "40px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="btn btn-primary btn-lg"
                onClick={() => {
                  setSelected([]);
                  setPage(0);
                }}
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3">
  <div className="row">
    <div className="col">
      <div className="card shadow p-3 mb-5 bg-body rounded">
        <EnhancedTableToolbar
          numSelected={selected.length}
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={page}
          onChangePage={handleChangePage}
        />
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th nowrap>
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th align="left" nowrap>ID</th>
                <th align="left" nowrap>Shpiify</th>
                <th align="left" nowrap>Date</th>
                <th align="left" nowrap>Status</th>
                <th align="left" nowrap>Customer</th>
                <th align="left" nowrap>Email</th>
                <th align="left" nowrap>Country</th>
                <th align="left" nowrap>Shipping</th>
                <th align="left" nowrap>Source</th>
                <th align="left" nowrap>Order Type</th>
                <th align="left" nowrap>Edit</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.ID);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <tr
                    key={row.ID}
                    onClick={(event) => handleClick(event, row.ID)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isItemSelected}
                          id="flexCheckDefault"
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </div>
                    </td>
                    <td align="left">{row.ID}</td>
                    <td align="left">{row.SHPIIFY}</td>
                    <td align="left">{row.DATE}</td>
                    <td align="left">{row.STATUS}</td>
                    <td align="left">{row.CUSTOMER}</td>
                    <td align="left">{row.EMAIL}</td>
                    <td align="left">{row.COUNTRY}</td>
                    <td align="left">{row.SHIPPING}</td>
                    <td align="left">{row.SOURCE}</td>
                    <td align="left">{row.ORDERTYPE}</td>
                    <td align="left">
                      <button className="btn btn-primary">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {emptyRows > 0 && (
                <tr style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <td colSpan="6"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>


      
    </>
  );
}
