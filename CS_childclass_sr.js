/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/search'], function(search) {

    function saveRecord(context) {
        var currentRecord = context.currentRecord;
        var classId = currentRecord.getValue({ fieldId: 'class' });

        if (classId) {
            var nameNoHierarchy = getClassNameNoHierarchy(classId);

            // Set the value if it's different from the current value
            if (currentRecord.getValue({ fieldId: 'class' }) !== nameNoHierarchy) {
                currentRecord.setValue({
                    fieldId: 'class',
                    value: nameNoHierarchy
                });
            }
        }

        // Return true to allow record to be saved
        return true;
    }

    function getClassNameNoHierarchy(classId) {
        var nameNoHierarchy = '';
        
        var classificationSearchObj = search.create({
            type: "classification",
            filters: [
                ["internalid", "anyof", classId]
            ],
            columns: [
                search.createColumn({ name: "namenohierarchy", label: "Name (no hierarchy)" })
            ]
        });

        classificationSearchObj.run().each(function(result) {
            nameNoHierarchy = result.getValue({ name: 'namenohierarchy' });
            return false; // Stop after the first result
        });

        return nameNoHierarchy;
    }

    return {
        saveRecord: saveRecord
    };
});
