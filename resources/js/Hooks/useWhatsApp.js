export function useWhatsApp() {
    const phoneNumber = '919999999999';

    const createMessage = ({
        page = 'website',
        service = '',
        project = '',
        estimate = null,
    } = {}) => {
        let message = `Hello GrihNirmaan team, I am interested in your home construction services.`;

        if (service) {
            message += ` I want to know more about ${service}.`;
        }

        if (project) {
            message += ` I liked the project: ${project}.`;
        }

        if (estimate) {
            message += ` My estimated budget is ₹${estimate}.`;
        }

        message += ` Source: ${page}`;

        return message;
    };

    const getWhatsAppUrl = (options = {}) => {
        const message = createMessage(options);

        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    };

    const openWhatsApp = (options = {}) => {
        window.open(getWhatsAppUrl(options), '_blank');
    };

    return {
        createMessage,
        getWhatsAppUrl,
        openWhatsApp,
    };
}
