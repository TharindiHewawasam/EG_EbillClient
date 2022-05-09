<%@page import="com.ebill.Model.Bill"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Electricity Bill Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/bills.js"></script>
</head>
<body>

<div class="container"><div class="row"><div class="col-6">

	<h1>Electricity Bill Management </h1>

	<form id="formBill" name="formBill">
 		Electricity Account Number:
 		<input id="elec_acc_no" name="elec_acc_no" type="text" class="form-control form-control-sm">
 		<br> 
 		Month:
		<input id="month" name="month" type="text" class="form-control form-control-sm">
 		<br> 
 		Current Meter reading:
 		<input id="current_meter_reading" name="current_meter_reading" type="text" class="form-control form-control-sm">
 		<br> 
 		Previous Meter Reading:
		<input id="previous_meter_reading" name="previous_meter_reading" type="text" class="form-control form-control-sm">
 		<br>
 		
 		<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
 		<input type="hidden" id="hidBillIDSave" name="hidBillIDSave" value="">
	</form>
	
	<div id="alertSuccess" class="alert alert-success"></div>
	<div id="alertError" class="alert alert-danger"></div>

	<br>
	<div id="divBillsGrid">
 		<%
 			Bill billObj = new Bill();
 			out.print(billObj.readBills());
 		%>
	</div>
</div> </div> </div>

</body>
</html>