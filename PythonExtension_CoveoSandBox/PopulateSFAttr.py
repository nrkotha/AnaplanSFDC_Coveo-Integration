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
    commonsource = ''
    facet = ''
    apcommenter = ''
    casedsobjecttype = ''
    datacategory = ["Customer Care","IT","HR","Procurement","Facilities"]

    if (metadata.get('source', '') == "Anaplan Cases"):
        commonsource = "Salesforce Cases"
        document.add_meta_data({"commonsource": commonsource})

        casedsobjecttype = metadata.get('objecttype', '')

        if (casedsobjecttype == "FeedItem"):
            if ("sfcreatedby" in metadata):
                apcommenter = metadata.get('sfcreatedby','')
                document.add_meta_data({"apcommenter": apcommenter})
        elif (casedsobjecttype == "Case"):
            if ("sftype" in metadata):
                document.add_meta_data({"apcasetype": metadata.get('sftype','')})
            
            if ("sfaccountname" in metadata):
                document.add_meta_data({"apaccountname": metadata.get('sfaccountname','')})
    elif (metadata.get('source', '') == "Anaplan Knowledge Articles"):
        commonsource = "Salesforce Knowledge"
        document.add_meta_data({"commonsource": commonsource})

        if ("sfdcexpandedbusinessunit" in metadata):
            for x in datacategory:
                if x in metadata.get('sfdcexpandedbusinessunit',''):
                    facet = facet + x + ';'
        if facet:
            document.add_meta_data({"kbdatacategory": facet[:-1]})
        
        if ("objecttype" in metadata):
            document.add_meta_data({"kbarticletype": metadata.get('objecttype','')})
except Exception as e:
    log("Error {}".format(str(e)))
