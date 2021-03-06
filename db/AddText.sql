DROP PROCEDURE [dbo].[AddText]
GO

CREATE PROCEDURE [dbo].[AddText]
(
	@id int = 0 OUTPUT,
	@label varchar(100) = '',
	@text varchar(max) = '',
	@action as tinyint = 10 /* 20 = insert; 10 = update; 0 = delete;*/,
	@visit_id as bigint = 0,
	@action_status_id as int = 0 OUTPUT,
	@action_msg as varchar(200) = '' OUTPUT
) AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @user_id AS int
	DECLARE @user_name AS varchar(10)

	/* EXEC [dbo].System_ValidateUser
		@user_id = @user_id OUTPUT,
		@user_name = @user_name OUTPUT,
		@action = @action,
		@visit_id = @visit_id,
		@action_status_id = @action_status_id OUTPUT,
		@action_msg = @action_status_id OUTPUT */

	IF @action_status_id < 0 GOTO DONE

	DECLARE @update_date [datetime] = GETDATE()

	IF @action = 0 /* delete */
	BEGIN
		DELETE [dbo].[tb_texts] WHERE [id] = @id
		GOTO DONE
	END

	IF LEN(@label) = 0
		SET @label = 'TNP'

	IF @action = 10  /* update */
	BEGIN
		UPDATE [dbo].[tb_texts] SET
			label = @label,
			notes_html = @text
  		WHERE [id] = @id
	END

	IF @action = 20 /* insert */
	BEGIN
		INSERT INTO [dbo].[tb_texts] (
			label,
			notes_html,
			parent_module_id,
			parent_id
		) VALUES (
			@label,
			@text,
			8, 
			46
		)

		SET @id = CAST(SCOPE_IDENTITY() as int);
	END

DONE:
	/* IF @action_status_id < 0
	BEGIN
		DECLARE @error_log_id AS int
		EXEC dbo.LogError @error_log_id OUTPUT, @action_status_id, '', 0, @visit_id
		SET @action_msg = dbo.F_GetErrorLog(@error_log_id)
	END */
END
