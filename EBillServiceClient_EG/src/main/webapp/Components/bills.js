$(document).ready(function()
{
	 $("#alertSuccess").hide();
 	 $("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
 	$("#alertSuccess").hide();
 	$("#alertError").text("");
 	$("#alertError").hide();

	// Form validation-------------------
	var status = validateBillForm();
	if (status != true)
	{
		 $("#alertError").text(status);
 		 $("#alertError").show();
 		 return;
 	}
 	
	// If valid-------------------------
 	var type = ($("#hidBillIDSave").val() == "") ? "POST" : "PUT";

 		$.ajax(
 	{
 		url : "BillsAPI",
 		type : type,
 		data : $("#formBill").serialize(),
 		dataType : "text",
 		complete : function(response, status)
 		{
 			onBillSaveComplete(response.responseText, status);
 		}
 	}); 
 });

 function onBillSaveComplete(response, status)
	{
		if (status == "success")
		{
			 var resultSet = JSON.parse(response);
 			 if (resultSet.status.trim() == "success")
			 {
 				$("#alertSuccess").text("Successfully saved.");
 				$("#alertSuccess").show();
 				$("#divItemsGrid").html(resultSet.data);
 			 } 
 			 else if (resultSet.status.trim() == "error")
			 {
 				$("#alertError").text(resultSet.data);
 				$("#alertError").show();
 			 }
 		} 
 		else if (status == "error")
 		{
 			$("#alertError").text("Error while saving.");
 			$("#alertError").show();
 		} 
 		else
 		{
 			$("#alertError").text("Unknown error while saving..");
 			$("#alertError").show();
 		}
		$("#hidBillIDSave").val("");
 		$("#formBill")[0].reset();
}

// UPDATE==========================================
	$(document).on("click", ".btnUpdate", function(event)
	{
		 $("#hidBillIDSave").val($(this).data("bill_id"));
		 $("#elec_acc_no").val($(this).closest("tr").find('td:eq(0)').text());
		 $("#month").val($(this).closest("tr").find('td:eq(1)').text());
		 $("#current_meter_reading").val($(this).closest("tr").find('td:eq(2)').text());
 		 $("#previous_meter_reading").val($(this).closest("tr").find('td:eq(3)').text());
	});
	
	
	$(document).on("click", ".btnRemove", function(event)
	{
 		$.ajax(
 		{
 			url : "BillsAPI",
 			type : "DELETE",
 			data : "bill_id=" + $(this).data("bill_id"),
 			dataType : "text",
 			complete : function(response, status)
 			{
 				onBillDeleteComplete(response.responseText, status);
 			}
 		});
	});

function onBillDeleteComplete(response, status)
	{
		if (status == "success")
 		{
 			var resultSet = JSON.parse(response);
 			if (resultSet.status.trim() == "success")
 			{
 				$("#alertSuccess").text("Successfully deleted.");
 				$("#alertSuccess").show();
 				$("#divBillsGrid").html(resultSet.data);
 			} 
 			else if (resultSet.status.trim() == "error")
 			{
 				$("#alertError").text(resultSet.data);
 				$("#alertError").show();
 			}
 		} 
 		else if (status == "error")
 		{
 				$("#alertError").text("Error while deleting.");
 				$("#alertError").show();
 		} 
 		else
 		{
 				$("#alertError").text("Unknown error while deleting..");
 				$("#alertError").show();
 		}
}
	
	// CLIENT-MODEL================================================================
	function validateBillForm()
	{
		// ELECTRICITY ACCOUNT NUMBER
		if ($("#elec_acc_no").val().trim() == "")
		{
 			return "Insert Electricity Account Number.";
 		}

		// MONTH
		if ($("#month").val().trim() == "")
 		{
 			return "Insert Month.";
 		}

		// CURRENT METER READING-------------------------------
		if ($("#current_meter_reading").val().trim() == "")
 		{
 			return "Insert Current Meter Reading";
 		}
 		
		// is numerical value
		var tmpMeterReading = $("#current_meter_reading").val().trim();
		if (!$.isNumeric(tmpMeterReading))
		{
 			return "Insert a numerical value for Current Meter Reading.";
 		}
 		
 		// convert to integer
		//$("#current_meter_reading").val(parseInt(tmpMeterReading));

		// PREVIOUS METER READING-------------------------------
		if ($("#previous_meter_reading").val().trim() == "")
 		{
 			return "Insert Previous Meter Reading";
 		}
 		
		// is numerical value
		var tmpPreMeterReading = $("#previous_meter_reading").val().trim();
		if (!$.isNumeric(tmpPreMeterReading))
		{
 			return "Insert a numerical value for Previous Meter Reading.";
 		}

		// convert to integer
		//$("#previous_meter_reading").val(parseInt(tmpPreMeterReading));
		

		return true;
	}
	
