const requireAll = requireContext => requireContext.keys().map(requireContext);
const req        = require.context('./svg', false, /\.svg$/);
const iconMap    = requireAll(req);
