# Contact Management System - Testing Guide

## 🎯 Quick Test Procedures

### Test 1: Submit Valid Contact Form

**Steps:**

1. Navigate to `http://localhost:5173/contact`
2. Fill in all fields:
   - Full Name: "John Doe"
   - Contact: "9819134044"
   - Email: "john@example.com"
   - Message: "I am interested in your copper tubes for industrial applications."
3. Click "Submit Enquiry"
4. **Expected**: Success message appears, form resets

---

### Test 2: Form Validation - Empty Fields

**Steps:**

1. Navigate to `/contact`
2. Click "Submit Enquiry" without filling any field
3. **Expected**: Error message "Please enter your full name"
4. Fill in name, clear email, click submit
5. **Expected**: Error message "Please enter your email address"

---

### Test 3: Email Validation

**Steps:**

1. Fill form with name, phone, message
2. Enter invalid email: "notanemail"
3. Click submit
4. **Expected**: Error "Please enter a valid email address"
5. Enter valid email: "test@example.com"
6. Click submit
7. **Expected**: Success message

---

### Test 4: Phone Number Validation

**Steps:**

1. Fill form with all fields
2. Enter invalid phone: "abcd1234"
3. Click submit
4. **Expected**: Error "Please enter a valid contact number"
5. Enter valid phone: "9876543210"
6. Click submit
7. **Expected**: Success message

---

### Test 5: Message Length Validation

**Steps:**

1. Fill form with all fields
2. Enter message: "Hi" (less than 10 characters)
3. Click submit
4. **Expected**: Error "Message must be at least 10 characters long"
5. Enter message: "I am interested in your products and services"
6. Click submit
7. **Expected**: Success message

---

### Test 6: Admin View Enquiries

**Steps:**

1. Login as admin (go to `/admin/login`)
2. Navigate to `/admin/contact`
3. **Expected**: Table shows all enquiries with:
   - Customer names
   - Email addresses
   - Phone numbers
   - Messages
   - Submission dates
4. Verify enquiry from Test 1 appears in list

---

### Test 7: Delete Enquiry

**Steps:**

1. Go to `/admin/contact`
2. Click "Delete" on any enquiry
3. Confirm deletion in popup
4. **Expected**:
   - Enquiry disappears from table
   - Table refreshes automatically

---

### Test 8: Email/Phone Links

**Steps:**

1. Go to `/admin/contact`
2. Click on email address in table
3. **Expected**: Default email client opens (or mailto: dialog)
4. Click on phone number
5. **Expected**: Phone dialer opens (tel: link)

---

### Test 9: Dashboard Stats

**Steps:**

1. Go to `/admin/dashboard`
2. **Expected**:
   - Total Blogs count shows actual number
   - Enquiries count shows actual number
   - Admin Users shows 1
3. Submit new contact form
4. Go back to dashboard
5. **Expected**: Enquiries count increases

---

### Test 10: WhatsApp Button

**Steps:**

1. Go to `/contact`
2. Click "Whatsapp Us" button
3. **Expected**:
   - Opens WhatsApp web/app in new tab
   - Pre-filled message appears
   - Ready to send

---

## 🧪 API Testing with cURL

### Test Contact Submission

```bash
curl -X POST http://localhost:9000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Doe",
    "contactNumber": "9876543210",
    "email": "jane@example.com",
    "message": "I would like to know more about your products and services."
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "contact": {
    "_id": "...",
    "fullName": "Jane Doe",
    "contactNumber": "9876543210",
    "email": "jane@example.com",
    "message": "I would like to know more about your products and services.",
    "createdAt": "2024-05-12T...",
    "updatedAt": "2024-05-12T..."
  }
}
```

---

### Test Get All Contacts (Protected)

```bash
TOKEN="your-jwt-token"

curl -X GET http://localhost:9000/api/contact \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "contacts": [
    {
      "_id": "...",
      "fullName": "Jane Doe",
      "contactNumber": "9876543210",
      "email": "jane@example.com",
      "message": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

### Test Delete Contact (Protected)

```bash
TOKEN="your-jwt-token"
CONTACT_ID="objectid_from_above"

curl -X DELETE http://localhost:9000/api/contact/$CONTACT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Contact deleted"
}
```

---

## 🐛 Common Issues & Fixes

### Issue: "Enquiry submitted but doesn't appear in admin panel"

**Solution:**

- Make sure you're logged in to admin
- Check browser console for errors
- Verify API response shows `success: true`
- Refresh the admin/contact page

### Issue: "Delete button doesn't work"

**Solution:**

- Ensure you're logged in as admin
- Check that token is valid (not expired)
- Check browser console for 401 errors
- Try logging out and back in

### Issue: "Form shows validation error that's wrong"

**Solution:**

- Clear the input field completely
- Type again carefully
- Check that you're not using special characters for phone
- Email should have @ and domain

### Issue: "Admin contact page shows 'Loading enquiries...' forever"

**Solution:**

- Check backend is running: `npm run dev` in backend folder
- Verify API endpoint is accessible: `curl http://localhost:9000/api/contact`
- Check browser console for network errors
- Verify token is valid

### Issue: "WhatsApp button doesn't work"

**Solution:**

- Make sure you have WhatsApp installed
- Or use web.whatsapp.com if mobile version doesn't work
- Check that phone number in code is correct: +919819134044

---

## 📊 Test Scenarios

### Scenario 1: Complete User Journey

1. User visits contact page
2. Fills in valid form
3. Submits enquiry
4. Sees success message
5. Admin views enquiry
6. Admin can click email/phone to contact
7. Admin deletes enquiry

### Scenario 2: Multiple Submissions

1. Submit first enquiry
2. Clear form (should auto-reset)
3. Submit second enquiry with different data
4. Admin panel shows both enquiries
5. Delete first enquiry
6. Second enquiry still visible

### Scenario 3: Error Handling

1. Submit with invalid email
2. See error message
3. Fix email
4. Submit successfully
5. Then submit with empty message
6. See different error message

---

## 📋 Validation Test Matrix

| Field   | Valid                | Invalid   | Error Message                               |
| ------- | -------------------- | --------- | ------------------------------------------- |
| Name    | "John Doe"           | ""        | Please enter your full name                 |
| Phone   | "9876543210"         | "abc"     | Please enter a valid contact number         |
| Email   | "john@test.com"      | "invalid" | Please enter a valid email address          |
| Message | "This is my message" | "Hi"      | Message must be at least 10 characters long |

---

## ✅ Success Criteria

All tests should pass:

- [ ] Contact form submits valid data
- [ ] Validation errors show correctly
- [ ] Success message appears after submission
- [ ] Admin can view enquiries
- [ ] Admin can delete enquiries
- [ ] Email/phone links work
- [ ] Dashboard stats update
- [ ] WhatsApp link works
- [ ] Loading states appear
- [ ] Error states handled gracefully

---

## 📝 Test Log Template

```
Test Date: ___________
Tester: ___________

Test 1: Submit Valid Form - [ ] PASS [ ] FAIL
Notes: ___________

Test 2: Form Validation - [ ] PASS [ ] FAIL
Notes: ___________

Test 3: Admin View - [ ] PASS [ ] FAIL
Notes: ___________

Test 4: Delete Enquiry - [ ] PASS [ ] FAIL
Notes: ___________

Test 5: Dashboard Stats - [ ] PASS [ ] FAIL
Notes: ___________

Overall Status: [ ] ALL PASS [ ] SOME FAILURES
```

---

## 🚀 Performance Testing

### Load Test

1. Submit 10 enquiries in quick succession
2. Go to admin panel
3. Verify all 10 show up in table
4. Verify table doesn't slow down
5. Delete all 10
6. Verify table clears properly

### Response Time Test

1. Measure form submission time: < 2 seconds
2. Measure admin page load: < 1 second
3. Measure table render: < 500ms
4. Measure delete operation: < 1 second

---

## 🔐 Security Testing

### Test 1: Unauthorized Access

```bash
# Try to get contacts without token
curl http://localhost:9000/api/contact

# Expected: 401 Unauthorized
```

### Test 2: Invalid Token

```bash
curl -X GET http://localhost:9000/api/contact \
  -H "Authorization: Bearer invalid_token"

# Expected: 401 Unauthorized
```

### Test 3: XSS Prevention

1. Try to submit with HTML: `<script>alert('xss')</script>`
2. Check that it's stored as text, not executed
3. Verify it displays as text in admin panel

---

## ✨ Summary

Contact system is working well when:
✅ Form validates all inputs correctly
✅ Success message shows after submission
✅ Admin can view all enquiries
✅ Enquiries can be deleted
✅ Dashboard shows correct counts
✅ Email and phone links work
✅ WhatsApp integration works
✅ No console errors
✅ No 401/404 errors
✅ All loading states work

**Status: READY FOR PRODUCTION** 🎉
