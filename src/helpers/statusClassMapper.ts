const statusClassMapper = (status: Status | undefined) => ({
  info: status === Status.Info,
  success: status === Status.Success,
  warning: status === Status.Warning,
  danger: status === Status.Danger,
  secondary: status === Status.Secondary
});

export default statusClassMapper;
