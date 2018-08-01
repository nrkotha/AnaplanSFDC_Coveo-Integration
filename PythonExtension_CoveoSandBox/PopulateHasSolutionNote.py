import re

def get_flattened_meta():
    flattened = dict()
    for m in document.get_meta_data():
        for metadata_name, metadata_values in m.values.iteritems():
            flattened[metadata_name.lower()] = metadata_values

    normalized = dict()
    for metadata_name, metadata_values in flattened.iteritems():
        if len(metadata_values) == 1:
            normalized[metadata_name] = metadata_values[0]
        elif len(metadata_values) > 1:
            normalized[metadata_name] = ';'.join(
                [str(value) for value in metadata_values])
    return normalized

metadata = get_flattened_meta()
try:
    if ('sfcmsolutionnotesc' in metadata):
    	document.add_meta_data({"hassolutionnote":"Solution Note"})
    else :
        document.add_meta_data({"hassolutionnote":""})
        
except Exception as e:
    log("Error {}".format(str(e)))  
