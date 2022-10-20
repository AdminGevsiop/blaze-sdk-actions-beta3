import React from 'react';

const DocusignModal = (props) => {

    const { docuRes={}, docuSignClick } = props;

    React.useLayoutEffect(() => {

        docuSignClick.Clickwrap.render({
            environment: docuRes.environment || 'https://demo.docusign.net',
            accountId: docuRes.accountId || 'ade25510-c191-4369-8130-3f6352845295',
            clickwrapId: docuRes.clickwrapId || '6d6eb359-8705-42e2-8293-4482805ae3e5',
            clientUserId:  docuRes.clientUserId,

            onMustAgree(agreement) {
                // Called when no users have previously agreed by the above client user ID for the most recent required Clickwrap version
            },
    
            onAgreed(agreement) {
                // Called when either 1) the clientUserId has previously agreed 2) the clientUserId has clicked agree and completed successfully
                props.onAccept(agreement);
            },
    
            onDeclined(agreement) {
                // Called when the clientUserId has declined successfully
                props.onDecline(agreement);
            }

        }, '#ds-terms-of-service');

    }, []);
  
    return <div id="ds-terms-of-service" />
};

export default DocusignModal;