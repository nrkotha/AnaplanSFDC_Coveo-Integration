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

#if the content is from Lithium
#  if the content is video or training use the labels

#  else use the topic field

#if the content is from the Help Portal, use the folder structure based on the following mapping
help_site_mapping = {
    "Calculation_Functions" : "Calculation Functions",
    "Modeling" : "Modeling",
    "Dashboards_and_Visualization" : "Dashboards and Visualization",
    "Data_Integrations" : "Data Integration",
    "Administration_and_Security" : "Administration and Security",
    "Import_and_Export" : "Importing and Exporting Data",
    "Extensions_and_Addins" : "Extensions and Add-ins",
    "ALM" : "Application Lifecycle Management"
}

metadata = get_flattened_meta()

try:
    commontopic = ''
    if (metadata.get('commonsource', '') == "Help Portal"):
        match = re.match(r'^.*help\.anaplan\.com\/anapedia\/Content\/(?P<found_topic>[^\/]*)\/.*', document.uri, re.I)
        commontopic = help_site_mapping.get(match.group('found_topic'), '') if match is not None else ''

    elif (metadata.get('commonsource', '') == "Community"):
        log("Doc Uri: %r" % document.uri)
        match = re.match(r'^.*\/board:(Videos|TrainingClasses)\/.*', document.uri, re.I)
        log("Match result: %r" % match)
        commontopic = metadata.get('limessagelabels', '') if match is not None else metadata.get('licategorytitle', '')

    document.add_meta_data({"commontopic": commontopic})

except Exception as e:
    log("Error {}".format(str(e)))