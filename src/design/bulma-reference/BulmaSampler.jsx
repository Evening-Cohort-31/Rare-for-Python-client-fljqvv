import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../design";
import "bulma/css/bulma.min.css";

export function BulmaSampler() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [activeTab, setActiveTab] = useState("colors");
  const navigate = useNavigate();
  return (
    <div className="section" style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div className="container">
        <h1 className="title is-1 has-text-centered mb-6">
          Bulma Design System Sampler
        </h1>
        <p className="subtitle has-text-centered mb-6">
          Custom Teal & Coral Theme
        </p>

        {/* Navigation Tabs */}
        <div className="tabs is-centered is-boxed mb-6">
          <ul style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
            <li>
              <button onClick={() => setActiveTab("colors")} className={activeTab === "colors" ? "button is-info" : "button is-light"}>
                <span>Colors</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("components")} className={activeTab === "components" ? "button is-info" : "button is-light"}>
                <span>Components</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("forms")} className={activeTab === "forms" ? "button is-info" : "button is-light"}>
                <span>Forms</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Color Palette Section */}
        {activeTab === "colors" && (
          <section className="mb-6">
            <h2 className="title is-2">Color Palette</h2>
            
            {/* Custom Colors */}
            <div className="box">
              <h3 className="title is-4">Custom Theme Colors</h3>
              <div className="columns is-multiline">
                <div className="column is-one-fifth">
                  <div
                    className="has-text-white has-text-centered p-5"
                    style={{
                      backgroundColor: "#0d9488",
                      borderRadius: "8px",
                    }}
                  >
                    <strong>Teal Primary</strong>
                    <br />
                    #0d9488
                  </div>
                </div>
                <div className="column is-one-fifth">
                  <div
                    className="has-text-white has-text-centered p-5"
                    style={{
                      backgroundColor: "#14b8a6",
                      borderRadius: "8px",
                    }}
                  >
                    <strong>Teal Light</strong>
                    <br />
                    #14b8a6
                  </div>
                </div>
                <div className="column is-one-fifth">
                  <div
                    className="has-text-dark has-text-centered p-5"
                    style={{
                      backgroundColor: "#5eead4",
                      borderRadius: "8px",
                    }}
                  >
                    <strong>Teal Pale</strong>
                    <br />
                    #5eead4
                  </div>
                </div>
                <div className="column is-one-fifth">
                  <div
                    className="has-text-white has-text-centered p-5"
                    style={{
                      backgroundColor: "#f97316",
                      borderRadius: "8px",
                    }}
                  >
                    <strong>Coral Accent</strong>
                    <br />
                    #f97316
                  </div>
                </div>
                <div className="column is-one-fifth">
                  <div
                    className="has-text-dark has-text-centered p-5"
                    style={{
                      backgroundColor: "#fed7aa",
                      borderRadius: "8px",
                    }}
                  >
                    <strong>Coral Light</strong>
                    <br />
                    #fed7aa
                  </div>
                </div>
              </div>
            </div>

            {/* Bulma Default Colors */}
            <div className="box">
              <h3 className="title is-4">Bulma Default Colors</h3>
              <div className="columns is-multiline">
                <div className="column is-one-fifth">
                  <div className="notification is-primary has-text-centered">
                    <strong>Primary</strong>
                  </div>
                </div>
                <div className="column is-one-fifth">
                  <div className="notification is-link has-text-centered">
                    <strong>Link</strong>
                  </div>
                </div>
                <div className="column is-one-fifth">
                  <div className="notification is-info has-text-centered">
                    <strong>Info</strong>
                  </div>
                </div>
                <div className="column is-one-fifth">
                  <div className="notification is-success has-text-centered">
                    <strong>Success</strong>
                  </div>
                </div>
                <div className="column is-one-fifth">
                  <div className="notification is-warning has-text-centered">
                    <strong>Warning</strong>
                  </div>
                </div>
                <div className="column is-one-fifth">
                  <div className="notification is-danger has-text-centered">
                    <strong>Danger</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Components Section */}
        {activeTab === "components" && (
          <section>
            {/* Typography */}
            <div className="box mb-6">
              <h2 className="title is-2">Typography</h2>
              <h1 className="title is-1">Heading 1 - Main Title</h1>
              <h2 className="title is-2">Heading 2 - Section Title</h2>
              <h3 className="title is-3">Heading 3 - Subsection</h3>
              <h4 className="title is-4">Heading 4</h4>
              <p className="subtitle is-5">
                Subtitle - Used for secondary headings
              </p>
              <p>
                Body text - This is regular paragraph content with standard
                styling. Bulma provides a clean, readable typography system.
              </p>
              <p className="has-text-grey is-size-7 mt-2">
                Small text - Used for captions and metadata
              </p>
            </div>

            {/* Buttons */}
            <div className="box mb-6">
              <h2 className="title is-3">Buttons</h2>
              <div><Button as="a" href="/button-demo" color="info">Button Sampler</Button></div>
              <div className="buttons">
                <button className="button is-primary">Primary</button>
                <button className="button is-link">Link</button>
                <button className="button is-info">Info</button>
                <button className="button is-success">Success</button>
                <button className="button is-warning">Warning</button>
                <button className="button is-danger">Danger</button>
              </div>
              
              <h3 className="title is-5 mt-4">Button Variants</h3>
              <div className="buttons">
                <button className="button is-primary is-outlined">Outlined</button>
                <button className="button is-primary is-light">Light</button>
                <button className="button is-primary is-inverted">Inverted</button>
                <button className="button is-primary is-rounded">Rounded</button>
                <button className="button is-primary is-loading">Loading</button>
              </div>

              <h3 className="title is-5 mt-4">Button Sizes</h3>
              <div className="buttons">
                <button className="button is-primary is-small">Small</button>
                <button className="button is-primary">Normal</button>
                <button className="button is-primary is-medium">Medium</button>
                <button className="button is-primary is-large">Large</button>
              </div>

              {/* Custom Styled Buttons */}
              <h3 className="title is-5 mt-4">Custom Theme Buttons</h3>
              <div className="buttons">
                <button
                  className="button"
                  style={{ backgroundColor: "#0d9488", color: "white" }}
                >
                  Teal Primary
                </button>
                <button
                  className="button"
                  style={{
                    backgroundColor: "#f97316",
                    color: "white",
                    borderRadius: "8px",
                  }}
                >
                  Coral Accent
                </button>
                <button
                  className="button is-outlined"
                  style={{ borderColor: "#0d9488", color: "#0d9488" }}
                >
                  Teal Outlined
                </button>
              </div>
            </div>

            {/* Tags/Badges */}
            <div className="box mb-6">
              <h2 className="title is-3">Tags</h2>
              <div className="tags">
                <span className="tag">Default</span>
                <span className="tag is-primary">Primary</span>
                <span className="tag is-link">Link</span>
                <span className="tag is-info">Info</span>
                <span className="tag is-success">Success</span>
                <span className="tag is-warning">Warning</span>
                <span className="tag is-danger">Danger</span>
              </div>

              <h3 className="title is-5 mt-4">Tag Sizes</h3>
              <div className="tags">
                <span className="tag is-small is-primary">Small</span>
                <span className="tag is-primary">Normal</span>
                <span className="tag is-medium is-primary">Medium</span>
                <span className="tag is-large is-primary">Large</span>
              </div>

              <h3 className="title is-5 mt-4">Rounded & Light Tags</h3>
              <div className="tags">
                <span className="tag is-primary is-light is-rounded">Scheduled</span>
                <span className="tag is-success is-light is-rounded">Completed</span>
                <span className="tag is-warning is-light is-rounded">Pending</span>
                <span className="tag is-danger is-light is-rounded">Cancelled</span>
              </div>

              <h3 className="title is-5 mt-4">Custom Theme Tags</h3>
              <div className="tags">
                <span
                  className="tag is-rounded"
                  style={{ backgroundColor: "#0d9488", color: "white" }}
                >
                  Active
                </span>
                <span
                  className="tag is-rounded"
                  style={{ backgroundColor: "#f97316", color: "white" }}
                >
                  Featured
                </span>
                <span
                  className="tag is-rounded"
                  style={{ backgroundColor: "#5eead4", color: "#0f172a" }}
                >
                  New
                </span>
              </div>
            </div>

            {/* Cards */}
            <div className="box mb-6">
              <h2 className="title is-3">Cards</h2>
              <div className="columns">
                <div className="column">
                  <div className="card">
                    <header className="card-header">
                      <p className="card-header-title">Standard Card</p>
                    </header>
                    <div className="card-content">
                      <div className="content">
                        A card with header and content. Perfect for displaying
                        information in a structured format.
                      </div>
                    </div>
                    <footer className="card-footer">
                      <button className="card-footer-item" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit", textDecoration: "none" }}>Edit</button>
                      <button className="card-footer-item" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit", textDecoration: "none" }}>Delete</button>
                    </footer>
                  </div>
                </div>

                <div className="column">
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#ecfdf5",
                      borderTop: "4px solid #0d9488",
                    }}
                  >
                    <header className="card-header">
                      <p className="card-header-title">Teal Accent Card</p>
                      <span className="card-header-icon">
                        <span
                          className="tag is-rounded"
                          style={{ backgroundColor: "#0d9488", color: "white" }}
                        >
                          Active
                        </span>
                      </span>
                    </header>
                    <div className="card-content">
                      <div className="content">
                        This card uses custom teal styling to highlight
                        important information.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#fff7ed",
                      borderTop: "4px solid #f97316",
                    }}
                  >
                    <header className="card-header">
                      <p className="card-header-title">Coral Accent Card</p>
                    </header>
                    <div className="card-content">
                      <div className="content">
                        Featured content with coral accent for emphasis.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications/Alerts */}
            <div className="box mb-6">
              <h2 className="title is-3">Notifications</h2>
              <div className="notification is-info">
                <button className="delete"></button>
                <strong>Info:</strong> This is an informational message.
              </div>
              <div className="notification is-success">
                <button className="delete"></button>
                <strong>Success!</strong> Your appointment has been scheduled.
              </div>
              <div className="notification is-warning">
                <button className="delete"></button>
                <strong>Warning:</strong> Please arrive 15 minutes early.
              </div>
              <div className="notification is-danger">
                <button className="delete"></button>
                <strong>Error:</strong> Unable to process your request.
              </div>

              <h3 className="title is-5 mt-4">Custom Theme Notifications</h3>
              <div
                className="notification"
                style={{
                  backgroundColor: "#d1fae5",
                  borderLeft: "4px solid #0d9488",
                }}
              >
                <strong style={{ color: "#065f46" }}>Teal Notice:</strong>{" "}
                <span style={{ color: "#047857" }}>
                  Custom styled notification with teal accent
                </span>
              </div>
            </div>

            {/* Modal */}
            <div className="box mb-6">
              <h2 className="title is-3">Modal</h2>
              <button
                className="button is-primary"
                onClick={() => setIsModalActive(true)}
              >
                Open Modal
              </button>

              <div className={`modal ${isModalActive ? "is-active" : ""}`}>
                <div
                  className="modal-background"
                  onClick={() => setIsModalActive(false)}
                ></div>
                <div className="modal-card">
                  <header className="modal-card-head">
                    <p className="modal-card-title">Example Modal</p>
                    <button
                      className="delete"
                      aria-label="close"
                      onClick={() => setIsModalActive(false)}
                    ></button>
                  </header>
                  <section className="modal-card-body">
                    <p className="mb-4">
                      This is a modal dialog. It can be used for confirmations,
                      forms, or displaying detailed information.
                    </p>
                    <div className="field">
                      <label className="label">Example Input</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="Enter something..."
                        />
                      </div>
                    </div>
                  </section>
                  <footer className="modal-card-foot">
                    <button
                      className="button is-success"
                      onClick={() => setIsModalActive(false)}
                    >
                      Confirm
                    </button>
                    <button
                      className="button"
                      onClick={() => setIsModalActive(false)}
                    >
                      Cancel
                    </button>
                  </footer>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="box mb-6">
              <h2 className="title is-3">Table</h2>
              <table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                  <tr>
                    <th>Exam Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mathematics Final</td>
                    <td>Dec 15, 2024</td>
                    <td>9:00 AM</td>
                    <td>
                      <span className="tag is-success is-light">Scheduled</span>
                    </td>
                  </tr>
                  <tr>
                    <td>English Midterm</td>
                    <td>Dec 18, 2024</td>
                    <td>2:00 PM</td>
                    <td>
                      <span className="tag is-warning is-light">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>History Quiz</td>
                    <td>Dec 10, 2024</td>
                    <td>11:00 AM</td>
                    <td>
                      <span className="tag is-info is-light">Completed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Progress Bars */}
            <div className="box mb-6">
              <h2 className="title is-3">Progress Bars</h2>
              <progress className="progress is-primary" value="15" max="100">
                15%
              </progress>
              <progress className="progress is-link" value="30" max="100">
                30%
              </progress>
              <progress className="progress is-info" value="45" max="100">
                45%
              </progress>
              <progress className="progress is-success" value="60" max="100">
                60%
              </progress>
              <progress className="progress is-warning" value="75" max="100">
                75%
              </progress>
              <progress className="progress is-danger" value="90" max="100">
                90%
              </progress>
            </div>

            {/* Breadcrumb */}
            <div className="box mb-6">
              <h2 className="title is-3">Breadcrumb</h2>
              <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                  <li>
                    <button style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit", textDecoration: "underline" }}>Dashboard</button>
                  </li>
                  <li>
                    <button style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit", textDecoration: "underline" }}>Exams</button>
                  </li>
                  <li className="is-active">
                    <button style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit", textDecoration: "underline" }} aria-current="page">
                      Schedule
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Pagination */}
            <div className="box mb-6">
              <h2 className="title is-3">Pagination</h2>
              <nav
                className="pagination is-centered"
                role="navigation"
                aria-label="pagination"
              >
                <a className="pagination-previous">Previous</a>
                <a className="pagination-next">Next page</a>
                <ul className="pagination-list">
                  <li>
                    <button className="pagination-link" aria-label="Goto page 1" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit" }}>
                      1
                    </button>
                  </li>
                  <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                  </li>
                  <li>
                    <button className="pagination-link" aria-label="Goto page 45" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit" }}>
                      45
                    </button>
                  </li>
                  <li>
                    <button
                      className="pagination-link is-current"
                      aria-label="Page 46"
                      aria-current="page"
                      style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit" }}
                    >
                      46
                    </button>
                  </li>
                  <li>
                    <button className="pagination-link" aria-label="Goto page 47" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit" }}>
                      47
                    </button>
                  </li>
                  <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                  </li>
                  <li>
                    <button className="pagination-link" aria-label="Goto page 86" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit" }}>
                      86
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Message Box */}
            <div className="box mb-6">
              <h2 className="title is-3">Message Box</h2>
              <article className="message is-info">
                <div className="message-header">
                  <p>Info Message</p>
                  <button className="delete" aria-label="delete"></button>
                </div>
                <div className="message-body">
                  This is an informational message box. It can contain longer
                  content and structured information.
                </div>
              </article>

              <article className="message is-success">
                <div className="message-header">
                  <p>Success Message</p>
                </div>
                <div className="message-body">
                  Your changes have been saved successfully!
                </div>
              </article>
            </div>
          </section>
        )}

        {/* Forms Section */}
        {activeTab === "forms" && (
          <section>
            <div className="box mb-6">
              <h2 className="title is-2">Form Elements</h2>

              {/* Text Inputs */}
              <div className="field">
                <label className="label">Text Input</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter text here..."
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Email Input</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input is-success"
                    type="email"
                    placeholder="email@example.com"
                    value="hello@example.com"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </div>
                <p className="help is-success">This email is valid</p>
              </div>

              <div className="field">
                <label className="label">Password Input</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
              </div>

              {/* Select Dropdown */}
              <div className="field">
                <label className="label">Select Dropdown</label>
                <div className="control">
                  <div className="select">
                    <select>
                      <option>Choose an option...</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Multiple Select</label>
                <div className="control">
                  <div className="select is-multiple">
                    <select multiple size="4">
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                      <option>Option 4</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Textarea */}
              <div className="field">
                <label className="label">Textarea</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Enter your message..."
                  ></textarea>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="field">
                <label className="label">Checkboxes</label>
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" /> I agree to the terms and
                    conditions
                  </label>
                </div>
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" /> Send me email notifications
                  </label>
                </div>
              </div>

              {/* Radio Buttons */}
              <div className="field">
                <label className="label">Radio Buttons</label>
                <div className="control">
                  <label className="radio">
                    <input type="radio" name="question" /> Yes
                  </label>
                  <label className="radio">
                    <input type="radio" name="question" /> No
                  </label>
                  <label className="radio">
                    <input type="radio" name="question" /> Maybe
                  </label>
                </div>
              </div>

              {/* File Input */}
              <div className="field">
                <label className="label">File Upload</label>
                <div className="file has-name is-fullwidth">
                  <label className="file-label">
                    <input className="file-input" type="file" name="resume" />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Choose a file…</span>
                    </span>
                    <span className="file-name">document.pdf</span>
                  </label>
                </div>
              </div>

              {/* Horizontal Form */}
              <h3 className="title is-4 mt-5">Horizontal Form</h3>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">From</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input
                        className="input"
                        type="text"
                        placeholder="Name"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input
                        className="input"
                        type="email"
                        placeholder="Email"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Sizes */}
              <h3 className="title is-4 mt-5">Input Sizes</h3>
              <div className="field">
                <div className="control">
                  <input
                    className="input is-small"
                    type="text"
                    placeholder="Small input"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Normal input"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Medium input"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    className="input is-large"
                    type="text"
                    placeholder="Large input"
                  />
                </div>
              </div>

              {/* Input States */}
              <h3 className="title is-4 mt-5">Input States</h3>
              <div className="field">
                <div className="control">
                  <input
                    className="input is-success"
                    type="text"
                    placeholder="Success input"
                    value="Valid input"
                  />
                </div>
                <p className="help is-success">This input is valid</p>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    className="input is-danger"
                    type="text"
                    placeholder="Danger input"
                    value="Invalid input"
                  />
                </div>
                <p className="help is-danger">This input is invalid</p>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Disabled input"
                    disabled
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="field is-grouped mt-5">
                <div className="control">
                  <button className="button is-link">Submit</button>
                </div>
                <div className="control">
                  <button className="button is-link is-light">Cancel</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Hero Section Example */}
        <section className="hero is-medium mb-6" style={{ backgroundColor: "#0d9488" }}>
          <div className="hero-body">
            <p className="title has-text-white">Hero Section</p>
            <p className="subtitle has-text-white">
              A full-width banner with custom teal background
            </p>
            <button
              className="button is-light is-large"
              style={{ borderRadius: "8px" }}
            >
              Get Started
            </button>
          </div>
        </section>

        {/* Media Object */}
        <div className="box mb-6">
          <h2 className="title is-3">Media Object</h2>
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="User avatar"
                />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>John Smith</strong> <small>@johnsmith</small>{" "}
                  <small>31m</small>
                  <br />
                  This is an example of the media object component, perfect for
                  comments, social posts, or user profiles.
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <button className="level-item" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit" }}>
                    <span className="icon is-small">
                      <i className="fas fa-reply"></i>
                    </span>
                  </button>
                  <button className="level-item" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit" }}>
                    <span className="icon is-small">
                      <i className="fas fa-retweet"></i>
                    </span>
                  </button>
                  <button className="level-item" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "inherit" }}>
                    <span className="icon is-small">
                      <i className="fas fa-heart"></i>
                    </span>
                  </button>
                </div>
              </nav>
            </div>
          </article>
        </div>

        {/* Footer */}
        <footer className="footer" style={{ backgroundColor: "#0d9488" }}>
          <div className="content has-text-centered has-text-white">
            <p className="has-text-white">
              <strong className="has-text-white">Bulma Sampler</strong> - Custom
              Teal & Coral Theme
            </p>
            <p className="has-text-white-ter">
              Built with Bulma CSS Framework
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}