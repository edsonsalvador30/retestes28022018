package blockly;

import cronapi.*;
import cronapi.rest.security.CronappSecurity;
import java.util.concurrent.Callable;

@CronapiMetaData(type = "blockly")
@CronappSecurity
public class Bloco {

	public static final int TIMEOUT = 300;

	/**
	 *
	 * @return Var
	 */
	// Bloco
	public static Var Executar() throws Exception {
		return new Callable<Var>() {

			private Var item = Var.VAR_NULL;
			private Var banco = Var.VAR_NULL;

			public Var call() throws Exception {
				item = cronapi.util.Operations.getCurrentUserName();
				System.out.println(item.getObjectAsString());
				banco = cronapi.database.Operations.query(Var.valueOf("app.entity.User"),
						Var.valueOf("select u.email, u.password, u.picture, u.theme from User u"));
				return cronapi.database.Operations.getField(banco, Var.VAR_NULL);
			}
		}.call();
	}

}
