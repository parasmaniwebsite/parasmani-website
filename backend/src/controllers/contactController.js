import Contact from "../models/Contact.js";

// Create Contact
export const createContact = async (req, res) => {
  try {
    const {
      fullName,
      contactNumber,
      email,
      message,
      source,
      company,
      brand,
      timeline,
      estimate,
    } = req.body;

    /* Everything after `message` is optional and only the project estimator
       sends it. Left undefined, `source` falls back to its schema default and
       the rest are simply absent. */
    const contact = await Contact.create({
      fullName,
      contactNumber,
      email,
      message,
      source,
      company,
      brand,
      timeline,
      estimate,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Status
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
