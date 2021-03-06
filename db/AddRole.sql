DROP PROCEDURE [dbo].[AddRole]
GO

CREATE PROCEDURE [dbo].[AddRole]
(
	@id AS int = 0 OUTPUT,
	@role AS varchar(100) = '',
	@description AS varchar(200) = '',
	@application_id AS int = 0, 
	@position AS int = 0, 
	@status_code_id AS int = 10,

    @action as tinyint = 10, /* 20 = insert; 10 = update; 0 = delete;*/
    @visit_id as bigint = 0,
    @action_status_id as int = 0 OUTPUT,
    @action_msg as varchar(200) = '' OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;

    DECLARE @user_id AS int

	SELECT
		@user_id = user_id,
		@application_id = application_id
	FROM visits
	WHERE id = @visit_id

	DECLARE @this_module_id AS int = 2

	SET @action_msg = ''
	SET @action_status_id = 0

	IF NOT @action IN (0, 10, 20)
		SET @action_status_id = -250 /* invalid request*/

	IF @action_status_id >= 0 AND (@user_id < 1 or not exists (SELECT * from users WHERE [id] = @user_id) ) AND exists (SELECT * from users WHERE [id] > 0) /* skip during DB initialisation */
		SET @action_status_id = -15 /* not logged in*/

	IF @action_status_id < 0 GOTO DONE

	IF @action = 0
	BEGIN
		if @id = 5 -- super
		begin
			SET @action_status_id = -1
			SET @action_msg = '<b>Super</b> user is a system user account'
			goto DONE
		end

		IF EXISTS(SELECT * FROM user_roles WHERE role_id = @id)
		BEGIN
			SET @action_status_id = -2
			SET @action_msg = 'This role has users assigned to it.'
		END 
		ELSE BEGIN
			DELETE roles WHERE id = @id
			--SET @action_status_id = -3
			--SET @action_msg = 'Test...'
		END

	END 
	ELSE IF @id > 0
	BEGIN

		UPDATE roles SET 
			role = @role, 
			description = @description,
			position = @position,
			status_code_id = @status_code_id, 
			update_visit_id = @visit_id, 
			updated_at = getdate() 
		WHERE [id] = @id       

	END /* exists*/
	ELSE
	BEGIN

		INSERT INTO roles (
			role, 
			description,
			position,
			application_id,
			status_code_id,
			insert_visit_id, 
			inserted_at, 
			update_visit_id, 
			updated_at
		) VALUES ( 
			@role, 
			@description,
			@position,
			@application_id,
			@status_code_id,
			@visit_id, 
			getdate(), 
			@visit_id, 
			GETDATE()
		)

		SET @id = cast(scope_identity() AS int)

	END 

DONE:
	/*IF @action_status_id < 0
	BEGIN
		DECLARE @error_log_id AS int
		EXEC LogError @error_log_id OUTPUT, @action_status_id, '', 0, @visit_id 
		SET @action_msg = dbo.F_GetErrorLog(@error_log_id)
	END */
END
